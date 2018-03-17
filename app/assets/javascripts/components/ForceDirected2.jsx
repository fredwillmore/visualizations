class ForceDirected2 extends React.Component {

  constructor (props) {
    super(props)
    this.state = { nodes: [], links: [] }
    this.width = 960
    this.height = 500
    this.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id((d) => d.id ))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.width / 2, this.height / 2));
  }

  dragsubject() {
    return this.simulation.find(d3.event.x, d3.event.y)
  }
  
  dragstarted() {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  dragended() {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  componentDidMount() {
    this.updateData()
  }

  updateData() {
    $.ajax({
      url: this.props.dataUrl,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data})
        var graph = data

        this.simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        this.simulation.force("link")
            .links(graph.links);

        d3.select(document.querySelector("canvas"))
            .call(
              d3.drag()
                .container(document.querySelector("canvas"))
                .subject(this.dragsubject.bind(this))
                .on("start", this.dragstarted.bind(this))
                .on("drag", this.dragged.bind(this))
                .on("end", this.dragended.bind(this))
            );

        function ticked() {
          var canvas = document.querySelector("canvas")
          context = canvas.getContext("2d")
          context.clearRect(0, 0, width, height);

          context.beginPath();
          graph.links.forEach(drawLink);
          context.strokeStyle = "#aaa";
          context.stroke();

          context.beginPath();
          graph.nodes.forEach(drawNode);
          context.fill();
          context.strokeStyle = "#fff";
          context.stroke();
        }

      	function drawLink(d) {
      	  context.moveTo(d.source.x, d.source.y);
      	  context.lineTo(d.target.x, d.target.y);
      	}

      	function drawNode(d) {
      	  context.moveTo(d.x + 3, d.y);
      	  context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
      	}
      }.bind(this)
    });

  }

  render() {
    return (
      <div>
        <canvas width="960" height="600"></canvas>
      </div>
    )
  }
}
