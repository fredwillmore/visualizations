var ReactTransitionGroup = React.addons.TransitionGroup

class Bar extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillEnter(callback) {
    this.triggerTransitions(callback)
  }

  componentDidUpdate() {
    this.triggerTransitions()
  }

  triggerTransitions(callback = () => {}) {
    var node = d3.select(ReactDOM.findDOMNode(this))
      .transition()
        .delay(this.props.transitionAttributes.delay)
        .duration(this.props.transitionAttributes.duration)
        .attr(this.props.transitionAttributes.xyAttr1, this.props.transitionAttributes.xyVal1)
        .attr(this.props.transitionAttributes.hwAttr1, this.props.transitionAttributes.hwVal1)
      .transition()
        .attr(this.props.transitionAttributes.xyAttr2, this.props.transitionAttributes.xyVal2)
        .attr(this.props.transitionAttributes.hwAttr2, this.props.transitionAttributes.hwVal2)
      .on('end', () => callback())
  }

  render() {
    return(
      <rect
        x = {this.props.x}
        y = {this.props.y}
        width = {this.props.width}
        height = {this.props.height}
        label = {this.props.label}
        fill = {this.props.fill}
      />
    )
  }
}
