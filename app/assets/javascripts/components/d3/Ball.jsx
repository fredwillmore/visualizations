var ReactTransitionGroup = React.addons.TransitionGroup

class Ball extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fill: props.fill,
      cx: props.cx,
      cy: props.cy,
      r: props.r
    }
  }

  componentWillEnter() {
    this.triggerTransitions()
  }

  componentDidUpdate() {
    this.triggerTransitions()
  }

  triggerTransitions() {
    var node = d3.select(ReactDOM.findDOMNode(this))
    if(this.props.paused){
      node.transition().duration(0)
      // this.savedTime = node.attr('T')
    } else {
      if(this.props.transitionAttributes){
        var callback = this.props.transitionAttributes.callback || ()=>{}
        var duration = this.props.transitionAttributes.duration
        node.transition().ease(d3.easeLinear)
            .duration(duration)
            .attr('cx', this.props.transitionAttributes.cx)
            .attr('cy', this.props.transitionAttributes.cy)
            // .attr('T', 1)
          .on('end', () => callback())
      }
    }
  }

  render() {
    return(
      <circle
        fill = {this.state.fill}
        cx = {this.state.cx}
        cy = {this.state.cy}
        r = {this.state.r}
      >
      </circle>
    )
  }
}
