class MultiLineChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      headerText: this.props.headerText,
      subHeaderText: this.props.subHeaderText,
      innerWidth: props.width - props.margin.left - props.margin.right,
      innerHeight: props.height - props.margin.top - props.margin.bottom,
      xMin: this.props.xMin,
      xMax: this.props.xMax,
      yMin: this.props.yMin,
      yMax: this.props.yMax
    }

    this.getHeaderText = this.props.getHeaderText.bind(this)
    this.getSubheaderText = this.props.getSubheaderText.bind(this)
    this.formatData = this.props.formatData
  }

  componentWillReceiveProps(nextProps) {
    if([nextProps.xMin, nextProps.yMin] != [this.state.xMin, this.state.yMin]){
      this.setState({
        xMin: nextProps.xMin,
        yMin: nextProps.yMin
      })
    }
  }

  componentDidMount() {
    $.ajax({
      url: this.props.dataUrl,
      dataType: 'json',
      success: function(data) {
        this.setState({data: this.formatData(data)})
      }.bind(this)
    });
  }

  createScales() {
    this.yScale = d3.scaleLinear().domain(
      [this.state.yMax, this.state.yMin]
    ).range(
      [0, this.state.innerHeight]
    )
    this.xScale = getScale(this.props.xScale).domain(
      [this.state.xMin, this.state.xMax]
    ).range(
      [0, this.state.innerWidth]
    )
  }

  updateHeaderText(d = null) {
    this.setState({
      headerText: d ? this.getHeaderText(d) : this.props.headerText,
      subHeaderText: d ? this.getSubheaderText(d) : this.props.subHeaderText
    })
  }

  xZoom(){
    return Math.round(this.state.innerWidth * this.props.zoomFactor / 2)
  }

  yZoom(){
    return Math.round(this.state.innerHeight * this.props.zoomFactor / 2)
  }

  xMin() {
    var xMin = this.xScale.invert(-this.xZoom())
    return xMin < this.props.xMin ? this.props.xMin : xMin
  }

  xMax() {
    var xMax = this.xScale.invert(this.state.innerWidth + this.xZoom())
    return xMax > this.props.xMax ? this.props.xMax : xMax
  }

  yMin(){
    var yMin = this.yScale.invert(this.state.innerHeight + this.xZoom())
    // TODO: find a more elegant way of dealing with cases where min > max (smaller numbers at the top)
    if(this.props.yMin < this.props.yMax) {
      return yMin < this.props.yMin ? this.props.yMin : yMin
    } else {
      return yMin > this.props.yMin ? this.props.yMin : yMin
    }
  }

  yMax(){
    var yMax = this.yScale.invert(-this.xZoom())
    if(this.props.yMin < this.props.yMax) {
      return yMax > this.props.yMax ? this.props.yMax : yMax
    } else {
      return yMax < this.props.yMax ? this.props.yMax : yMax
    }
  }

  crudeZoomIn() {
    var newState = {
      xMin: this.xScale.invert(this.xZoom()),
      xMax: this.xScale.invert(this.state.innerWidth - this.xZoom()),
      yMin: this.yScale.invert(this.state.innerHeight - this.yZoom()),
      yMax: this.yScale.invert(this.yZoom())
    }
    this.setState(newState)
  }

  crudeZoomOut() {
    var newState = {
      xMin: this.xMin(),
      xMax: this.xMax(),
      yMin: this.yMin(),
      yMax: this.yMax()
    }
    this.setState(newState)
  }

  pan(panAmount) {
    if(panAmount){
      var newState = {
        xMin: this.xScale.invert(this.xScale(this.state.xMin) + panAmount),
        xMax: this.xScale.invert(this.xScale(this.state.xMax) + panAmount)
      }
      this.setState(newState)
    }
  }

  tilt(tiltAmount) {
    if(tiltAmount){
      var newState = {
        yMin: this.yScale.invert(this.yScale(this.state.yMin) + tiltAmount),
        yMax: this.yScale.invert(this.yScale(this.state.yMax) + tiltAmount)
      }
      this.setState(newState)
    }
  }

  panAmount(direction){
    switch (direction) {
      case 'left':
        return Math.max(-this.state.innerWidth * this.props.panFactor, this.xScale(this.props.xMin))
      case 'right':
        return Math.min(this.state.innerWidth * this.props.panFactor, this.xScale(this.props.xMax)-this.xScale(this.state.xMax))
      case 'up':
        return Math.max(-this.state.innerHeight * this.props.panFactor, this.yScale(this.props.yMax)-this.yScale(this.state.yMax))
      case 'down':
        return Math.min(this.state.innerHeight * this.props.panFactor, this.yScale(this.props.yMin)-this.state.innerHeight)
      default:
        return 0
    }
  }

  crudePanLeft() {
    this.pan(this.panAmount('left'))
  }

  crudePanRight() {
    this.pan(this.panAmount('right'))
  }

  crudePanUp() {
    this.tilt(this.panAmount('up'))
  }

  crudePanDown() {
    this.tilt(this.panAmount('down'))
  }

  render(){
    this.createScales()
    var line = d3.line()
      .x((d) => this.xScale(d.x || 0))
      .y((d) => this.yScale(d.y || 0))
    return (
      <div>
        <h2>{this.state.headerText}</h2>
        <p>{this.state.subHeaderText}</p>
        { /* TODO: eventually this should be controlled by natural zooming actions (scrolling, selecting or gestures) */ }
        <button onClick={this.crudeZoomIn.bind(this)}>Zoom In</button>
        <button onClick={this.crudeZoomOut.bind(this)}>Zoom Out</button>
        <button onClick={this.crudePanLeft.bind(this)}>Pan Left</button>
        <button onClick={this.crudePanRight.bind(this)}>Pan Right</button>
        <button onClick={this.crudePanUp.bind(this)}>Pan Up</button>
        <button onClick={this.crudePanDown.bind(this)}>Pan Down</button>
        <br />
        <svg width = {this.props.width} height = {this.props.height}>
          <g
            transform = {`translate(${this.props.margin.left},${this.props.margin.top})`}
            width = {this.state.innerWidth}
            height = {this.state.innerHeight}
          >
            <svg width={this.state.innerWidth} height={this.state.innerHeight}>
              <ReactTransitionGroup component="g" className="view">
                {
                  this.state.data.map((d, i) => (
                    <Line
                      // TODO: abstract out references to CountryCode
                      key = {i}
                      data = {{country: d.CountryCode}}
                      baseClassName = {`line ${d.CountryCode}`}
                      mouseOverClassName = {`line ${d.CountryCode} current`}
                      onMouseOverCallback = { () => this.updateHeaderText(d) }
                      onMouseOutCallback = { () => this.updateHeaderText() }
                      d = {line(d.values)}
                    />
                  ))
                }
              </ReactTransitionGroup>
            </svg>
            <Axis
              transform = {`translate(0, ${this.state.innerHeight})`}
              scale = {this.xScale}
              axis = {d3.axisBottom}
              ticks = {this.props.xTicks}
              tickFormat = {this.props.xTickFormat}
              />
            <Axis
              scale = {this.yScale}
              axis = {d3.axisLeft}
              ticks = {this.props.yTicks}
              tickFormat = {this.props.yTickFormat}
              />
          </g>
        </svg>
      </div>
    )
  }

}

MultiLineChart.defaultProps = {
  margin: {top: 30, right: 30, bottom: 30, left: 30},
  width: 925,
  height: 550,
  headerText: 'Default Header Text',
  subHeaderText: 'Default subheader text',
  xMin: 0,
  xMax: 100,
  yMin: 0,
  yMax: 100,
  xScale: 'linear',
  getHeaderText: (d) => '',
  getSubheaderText: (d) => '',
  formatData: (data) => data,
  xTicks: 5,
  xTickFormat: null,
  yTicks: 5,
  yTickFormat: null,
  zoomFactor: .1,
  panFactor: .1
}
