class Axis extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.refs.axis
    var axis = this.props.axis(this.props.scale)
    if(this.props.tickFormat) {
      axis.ticks(10, this.props.tickFormat)
    }
    s = d3.select(node)
      .call(axis)
    if(this.props.wrapWidth){
      s.selectAll(".tick text").call(wrap, this.props.wrapWidth)
    }
  }

  render(){
    return (
      <g
        className="axis"
        ref="axis"
        transform = {this.props.transform}
        width = {this.props.width}
      />
    )
  }
}
