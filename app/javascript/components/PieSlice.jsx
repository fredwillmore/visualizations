class PieSlice extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <g className="arc">
        <path
          d = {this.props.d}
          fill = {this.props.fill}
          stroke = {this.props.stroke}
        />
        { this.props.children }
      </g>
    )
  }
}

export default PieSlice
