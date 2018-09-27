import Path from './Path.jsx'
import ReactDOM from 'react-dom'

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
    node.transition()
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
        strokeColor = {this.props.strokeColor}
      />
    )
  }

}

Line.defaultProps = {
  transitionDuration: 500
}

export default Line