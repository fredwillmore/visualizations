var width = 961;
var height = 500;
var force = d3.forceSimulation()
  .force("charge", d3.forceManyBody())
  .force("link",   d3.forceLink().id( function(d) { 
    return d.name 
  }).distance(50).strength(1))
  .force("center", d3.forceCenter(width / 2, height / 2))

// *****************************************************

var color = d3.scaleOrdinal(d3['schemeCategory20'])
  .domain(Array.from({length: 20}, (x,i) => i))

var enterNode = (selection) => {
  selection.classed('node', true);

  selection.append('circle')
    .attr("r", (d) => d.size)
    .attr("fill", (d) => color(d.group))
    .call(d3.drag)

  selection.append('text')
    .attr("x", (d) => d.size + 5)
    .attr("dy", ".35em")
    .text((d) => d.key);
};

var updateNode = (selection) => {
  selection.attr("transform", function(d) { 
    return "translate(" + d.x + "," + d.y + ")"
  });
};

var enterLink = (selection) => {
  console.log('hello')
  selection.classed('link', true)
    .attr("stroke-width", (d) => d.size);
};

var updateLink = (selection) => {
  selection.attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
};

var updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode);
  selection.selectAll('.link')
    .call(updateLink);
};

// *****************************************************
// ** Graph and App components
// *****************************************************

class Graph extends React.Component {
  componentDidMount() {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    force.on('tick', () => {
      // after force calculation starts, call updateGraph
      // which uses d3 to manipulate the attributes,
      // and React doesn't have to go through lifecycle on each tick
      this.d3Graph.call(updateGraph);
    })
    
    $.ajax({
      url: this.props.dataUrl,
      dataType: 'json',
      success: function(data) {
        this.setState({
          nodes: data.nodes,
          links: data.links
        })
      }.bind(this)

    })
  }

  shouldComponentUpdate(nextProps) {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));

    var d3Nodes = this.d3Graph.selectAll('.node')
      .data(nextProps.nodes, (node) => node.key);
    d3Nodes.enter().append('g').call(enterNode);
    d3Nodes.exit().remove();
    d3Nodes.call(updateNode);

    var d3Links = this.d3Graph.selectAll('.link')
      .data(nextProps.links, (link) => link.key);
    d3Links.enter().insert('line', '.node').call(enterLink);
    d3Links.exit().remove();
    d3Links.call(updateLink);

    // clone the nodes and links
    var nodes = JSON.parse(JSON.stringify(nextProps.nodes));
    var links = JSON.parse(JSON.stringify(nextProps.links));
    if(nextProps.nodes.length > 0) {
      force.nodes(nodes).force('link').links(links)
      force.restart();
    }

    return false;
  }

  render() {
    return (
      <svg width={width} height={height}>
        <g ref='graph' />
      </svg>
    )
  }
}

class App extends React.Component {
  getInitialState() {
    return {
      nodes: [],
      links: [],
    };
  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    // randomData is loaded in from external file generate_data.js
    // and returns an object with nodes and links
    
    // var newState = randomData(this.state.nodes, width, height);
    // var newState = {nodes: this.state.nodes, links: this.state.links}
    // this.setState(newState);

    $.ajax({
      url: this.props.dataUrl,
      dataType: 'json',
      success: function(data) {
        this.setState({
          nodes: data.nodes,
          links: data.links
        })
      }.bind(this)
    })
  }

  render() {
    return (
      <div>
        <div className="update" onClick={this.updateData}>update</div>
        <Graph nodes={this.state.nodes} links={this.state.links} />
      </div>
    )
  }
}
