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
    if(this.props.transitionAttributes){
      var callback = this.props.transitionAttributes.callback || ()=>{}
      var node = d3.select(ReactDOM.findDOMNode(this))
      node.transition().ease(d3.easeLinear)
          .duration(this.props.transitionAttributes.duration)
          .attr('cx', this.props.transitionAttributes.cx)
          .attr('cy', this.props.transitionAttributes.cy)
        .on('end', () => callback())
    }
  }

  render() {
    return(
      <circle
        fill = {this.state.fill}
        cx = {this.state.cx}
        cy = {this.state.cy}
        r = {this.state.r} >
      </circle>
    )
  }
}
