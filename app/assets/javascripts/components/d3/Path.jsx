class Path extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {className: this.props.className}
  }


  componentWillReceiveProps(nextProps) {
    this.setState({className: nextProps.className})
  }

  handleMouseOver() {
    this.props.onMouseOverCallback()
  }

  handleMouseOut() {
    this.props.onMouseOutCallback()
  }

  handleClick(event) {
    this.props.onClickCallback(event)
  }

  render() {
    return (
      <path
        data = {this.props.data}
        className = {this.state.className}
        d = {this.props.d}
        onMouseOver = {this.handleMouseOver}
        onMouseOut = {this.handleMouseOut}
        onClick = {this.handleClick}
      />
    )
  }
}

Path.defaultProps = {

}
