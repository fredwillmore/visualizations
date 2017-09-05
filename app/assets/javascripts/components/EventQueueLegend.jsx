class EventQueueLegend extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillEnter() {
    this.triggerTransitions()
  }

  componentDidUpdate() {
    this.triggerTransitions()
  }

  triggerTransitions() {
    if(this.props.transitionAttributes){
      var callback = this.props.transitionAttributes.callback || ()=>{}
      var node = d3.select('#eventProgressTime')
      var duration = this.props.transitionAttributes.duration
      node.transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .on("start", function repeat() {
            d3.active(this)
                .tween("text", function() {
                  var that = d3.select(this),
                    i = d3.interpolateNumber(duration, 0)
                  return function(t) {
                    that.text(`Time: ${Math.round(i(t))}`)
                  }
                })
          })
    }
  }

  render() {
    return (
      <g transform={`translate(${this.props.x},${this.props.y})`}>
        <text fontWeight='bold'>Event Queue Info:</text>
        <g transform={'translate(0,20)'}>
          <text id='eventProgressTime'>
            Time: {this.props.currentEvent.time}
          </text>
          <g transform={'translate(150,0)'}>
            <text>
              Description: {this.props.currentEvent.description}
            </text>
          </g>
        </g>
        {
          this.props.eventQueue.map((v, k) => (
            <EventQueueLegendEntry
              key = {k}
              positionX = {0}
              positionY = {20 * (k+2)}
              event = {v} />
          ))
        }
    </g>
    )
  }
}

EventQueueLegend.defaultProps = {
  x: 100,
  y: 100,
  currentEvent: {time: 0},
  eventQueue: []
}
