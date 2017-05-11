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
        className = {this.props.className}
        relatedClassName = {this.props.relatedClassName}
        mouseOverClassName = {this.props.mouseOverClassName}
        clickedClassName = {this.props.clickedClassName}
        onMouseOverCallback = {this.props.onMouseOverCallback}
        onMouseOutCallback = {this.props.onMouseOutCallback}
        onClickCallback = {this.props.onClickCallback}
      />
    )
  }

}

Line.defaultProps = {
  transitionDuration: 500
}
