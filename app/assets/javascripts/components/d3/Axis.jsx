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

    // TODO: I'd like to just use d3.format as the default string formatting function
    // however, this doesn't seem to play nice with axes with log scale for ticks(>5.7182716096)
    // I don't know if this number is significant outside of the data set I'm trying to work with
    // I find issues with log representation of my bar chart
    // f = typeof(this.props.tickFormat) == 'function' ? this.props.tickFormat : d3.format(this.props.tickFormat)
    // axis.tickFormat(f).ticks(5.7182716096)
    if(typeof(this.props.tickFormat) == 'function'){
      axis.tickFormat(this.props.tickFormat).ticks(this.props.ticks)
    } else {
      axis.ticks(this.props.ticks, this.props.tickFormat)
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
        className = {this.props.className}
        ref="axis"
        transform = {this.props.transform}
        width = {this.props.width}
      />
    )
  }
}

Axis.defaultProps = {
  className: "axis",
  ticks: 10,
  tickFormat: (t) => t.toString()
}
