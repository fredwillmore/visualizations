class EventQueueLegendEntry extends React.Component {
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
  }

  render() {
    return (
      <g transform={`translate(${this.props.positionX},${this.props.positionY})`} >
        <text>
          Time: {Math.round(this.props.event.duration)}
        </text>
        <g transform={'translate(150,0)'}>
          <text>
            Description: {this.props.event.description}
          </text>
        </g>
      </g>
    )
  }
}

EventQueueLegendEntry.defaultProps = {
  positionX: 0,
  positionY: 0,
  event: {duration: 0},
}
