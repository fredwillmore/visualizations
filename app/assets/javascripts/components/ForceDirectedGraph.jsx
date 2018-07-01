var width = 800
var height = 600

// var force = d3.forceSimulation()
//     .force("link", d3.forceLink().id( (d) => d.index ).distance(50))
//     .force("collide",d3.forceCollide( (d) => d.r + 8 ).iterations(16) )
//     .force("charge", d3.forceManyBody())
//     .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
//     .force("y", d3.forceY(0))
//     .force("x", d3.forceX(0))
    
var force = d3.forceSimulation()
  .force("charge", d3.forceManyBody())
  .force("link",   d3.forceLink().id( (d) => d.index ).distance(50))
  .force("center", d3.forceCenter(width / 2, height / 2))

var enterNode = (selection) => {
  selection.select('circle')
    .attr("r", (d) => d.size)
    .call(d3.drag)

  selection.select('text')
    .attr("x", (d) => d.size + 5 )
    .attr("dy", ".35em")
}

var updateNode = (selection) => {
  selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
};

var enterLink = (selection) => {
  selection.attr("stroke-width", (d) => d.size);
}

var updateLink = (selection) => {
  selection.attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
}

var updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode);
  selection.selectAll('.link')
    .call(updateLink);
}

class Node extends React.Component {
  componentDidMount() {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(enterNode)
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(updateNode);
  }

  render() {
    return (
      <g className='node'>
        <circle/>
        <text>{this.props.data.title}</text>
      </g>
    )
  }
}
  
class ForceDirctedGraph extends React.Component {
  constructor (props) {
    super(props)
    this.state = { nodes: [], links: [] }
    this.margin = props.margin;
    this.innerWidth  = this.props.outerWidth  - this.margin.left - this.margin.right;
    this.innerHeight = this.props.outerHeight - this.margin.top  - this.margin.bottom;
  }

  componentDidMount() {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph))
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
        console.log('did mount')
        this.simulation()
            .nodes(data.nodes)
            // .on("tick", this.ticked.bind(this));
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

    // we should actually clone the nodes and links
    // since we're not supposed to directly mutate
    // props passed in from parent, and d3's force function
    // mutates the nodes and links array directly
    // we're bypassing that here for sake of brevity in example
    force.nodes(nextProps.nodes).links(nextProps.links);
    force.start();

    return false;
  }

  color(d) {
    return d3.scaleOrdinal(d3.schemeCategory20)(d)
  }

  render(){
    return (
      <svg width = {this.props.outerWidth} height = {this.props.outerHeight}>
        <g transform = {`translate(${this.margin.left},${this.margin.top})`} ref = "graph" >
          <g className = 'node' >
            {
              this.state.nodes.map(function (d, i) {
                return (
                  <Node data = {{
                      key: i,
                      fill: this.color(d.group),
                      r: 10,
                      size: 11,
                      cx: d.x,
                      title: d.name
                  }} />
                )
              }.bind(this)
            )
            }
          </g>
          <g className = 'links' >
            {
              this.state.links.map((d, i) => (
                <line
                  key = {i}
                  strokeWidth = { (d) => Math.sqrt(d.value) }
                />
              ))
            }
          </g>
        </g>
      </svg>
    )
  }
  
  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

}

ForceDirctedGraph.defaultProps = {
  selector: 'body',
  outerWidth: 900,
  outerHeight: 500,
  margin: { left: 60, top: 5, right: 5, bottom: 60 },
  colorScheme: 'schemeCategory10'
}
