import VisualizationsHelpers from '../../visualizations.js'
var vh = new VisualizationsHelpers

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
    var s = d3.select(node)
      .call(axis)

    if(this.props.wrapWidth){
      s.selectAll(".tick text").call(vh.wrap, this.props.wrapWidth)
    }
  }

  isX() {
    return this.props.axisType == 'x'
  }

  isY() {
    return this.props.axisType == 'y'
  }

  textTransform() {
    return this.isX() ? `translate(${this.props.width/2}, ${this.props.height + this.props.labelOffset})` : `translate(-${this.props.labelOffset}, ${this.props.height/2}) rotate(-90)`
  }

  axisTransform() {
    return this.isX() ? `translate(0, ${this.props.height})` : ''
  }

  render(){
    return (
      <g>
        <g
          className = {this.props.className}
          ref="axis"
          transform = {this.axisTransform()}
          width = {this.props.width}
        >
        </g>
        <text
          className = "label"
          textAnchor = 'middle'
          transform = {this.textTransform()}
        >
          {this.props.labelText}
        </text>
      </g>
    )
  }
}

Axis.defaultProps = {
  className: "axis",
  ticks: 10,
  tickFormat: (t) => t.toString(),
  labelOffset: 20
}

export default Axis

// TODO: the whole switch-on-type things happening to differentiate x and y axes is a code smell that indicates a need for dependency injection
// I don't think this is the right way to do it, but I'll just leave it here until it starts to smell bad

// class XAxis extends React.Component {
//   constructor (props) {
//     super(props)
//   }
//
//   render() {
//     return (
//       <Axis
//         axisType = 'x'
//         className = {this.props.className}
//         scale = {this.props.scale}
//         axis = {this.props.axis}
//         tickFormat = {this.props.tickFormat}
//         labelText = {this.props.labelText}
//         labelOffset = {this.props.labelOffset}
//         width = {this.props.width}
//         height = {this.props.height}
//       >
//       </Axis>
//     )
//   }
// }
//
// XAxis.defaultProps = {
//   className: "x axis",
//   tickFormat: (t) => t.toString(),
//   axis: ''
// }
