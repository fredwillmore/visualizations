class Rect extends React.Component {
  constructor (props) {
    super(props)
  }
  render(){
    return(
      <rect
        fill = {this.props.fill}
        x = {this.props.x}
        width = {this.props.width}
        y = {this.props.y}
        height = {this.props.height}
      />
    )
  }
}
