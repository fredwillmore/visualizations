class Line extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillEnter() {
    this.triggerTransitions()
  }

  componentDidUpdate() {
    this.triggerTransitions()
  }

  triggerTransitions() {
    var node = d3.select(ReactDOM.findDOMNode(this))
      .transition()
        .duration(this.props.transitionDuration)
        .attr('d', this.props.d)
  }

  render() {
    return (
      <Path
        data = {this.props.data}
        baseClassName = {this.props.baseClassName}
        mouseOverClassName = {this.props.mouseOverClassName}
        onMouseOverCallback = {this.props.onMouseOverCallback}
        onMouseOutCallback = {this.props.onMouseOutCallback}
      />
    )
  }

}

Line.defaultProps = {
  transitionDuration: 500
}
