class Path extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.state = {className: this.props.className}
  }

  handleMouseOver() {
    this.setState({className: this.props.mouseOverClassName})
    this.props.onMouseOverCallback()
  }

  handleMouseOut() {
    this.setState({className: this.props.className})
    this.props.onMouseOutCallback()
  }

  render() {
    return (
      <path
        data = {this.props.data}
        className = {this.state.className}
        d = {this.props.d}
        onMouseOver = {this.handleMouseOver}
        onMouseOut = {this.handleMouseOut}
      />
    )
  }
}

Path.defaultProps = {

}
