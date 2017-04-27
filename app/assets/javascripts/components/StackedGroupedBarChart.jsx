
class StackedGroupedBarChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: [], barDisplay: 'stacked' }
    this.valueFields = Object.keys(props.valueFieldsLabels);
    this.innerWidth = props.width - props.margin.left - props.margin.right,
    this.innerHeight = props.height - props.margin.top - props.margin.bottom;
  }

  componentDidMount() {
    $.ajax({
      dataUrl: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: this.formatData(data)})
      }.bind(this)
    })
  }

  formatData(data) {
    data.forEach((d) => {
      this.valueFields.forEach((field) => {
        d[field] = d[field]+d[field]
        if(isNaN(d[field])){
          d[field]=0
        }
      })
    })
    return data
  }

  // TODO: I think we can figure out how to live without this lookup
  createMetadataLookup() {
    this.metadataLookup = {
      [this.props.groupBy]: this.state.data.map((d) => d[this.props.groupBy]),
      label: Object.keys(this.props.valueFieldsLabels).map((v, k) => this.props.valueFieldsLabels[v])
    };
  }

  createScales() {
    var m = this.state.data.length, // The number of values per series.
      n = this.valueFields.length; // The number of series.

    // The xz array has m elements, representing the x-values shared by all series.
    // The yz array has n elements, representing the y-values of each of the n series.
    // Each yz[i] is an array of m non-negative numbers representing a y-value for xz[i].
    // The y01z array has the same structure as yz, but with stacked [y₀, y₁] instead of y.
    var xz = d3.range(m);
    var yz = this.valueFields.map((field) => this.state.data.map((row, row_index) => row[field]))
    this.state.y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz))
    this.state.yMax = d3.max(yz, (y) => d3.max(y))
    this.state.y1Max = d3.max(this.state.y01z, (y) => d3.max(y, (d) => d[1]))

    this.xScale = d3.scaleBand()
      .domain(xz)
      .rangeRound([0, this.innerWidth])
      .padding(0.08)

    this.yScale = d3.scaleLinear()
      .domain([0, this.state.y1Max])
      .range([this.innerHeight, 0])

    this.colorScale = d3.scaleOrdinal()
      .domain(d3.range(n))
      .range(d3.schemeCategory20c)
  }

  render(){
    this.createScales()
    this.createMetadataLookup()

    return (
    <div>
      { /* TODO: I would prefer if these controls weren't part of the component */ }
      <button onClick={this.transitionGrouped.bind(this)}>Grouped</button>
      <button onClick={this.transitionStacked.bind(this)}>Stacked</button>
      <br />

      <svg width = {this.props.width} height = {this.props.height}>
        <g transform = {`translate(${this.props.margin.left},${this.props.margin.top})`} >
          {
            this.state.y01z.map((d, i) => (
              <ReactTransitionGroup component="g" key={i} className="series">
                {
                  d.map((v, j) => {
                    return (
                    <Bar
                      key = {j}
                      j = {j}
                      x = {this.xScale(j)}
                      y = {this.innerHeight}
                      width = {this.xScale.bandwidth()}
                      height = '0'
                      label = {this.metadataLookup.label[j]}
                      fill = {this.colorScale(i)}
                      transitionAttributes = {this.getTransitionAttributes(v, j, i)}
                    />
                  )})
                }
              </ReactTransitionGroup>
            ))
          }
          <Axis
            transform = {`translate(0, ${this.innerHeight})`}
            width = '90'
            scale = {this.xScale}
            axis = {d3.axisBottom}
            wrapWidth = {this.xScale.bandwidth()}
            tickFormat = {(d) => this.metadataLookup[this.props.groupBy][d]}
          />
        </g>
      </svg>
    </div>
    )
  }

  // TODO: the transition attributes coming from this function are ugly, brittle, and overly verbose
  // figure out how to nice it up
  getTransitionAttributes(v, j, i){
    switch (this.state.barDisplay) {
      case 'grouped':
        return {
          duration: 500,
          delay: j * 10,
          xyAttr1: 'x',
          xyVal1: this.xScale(j) + this.xScale.bandwidth() / this.valueFields.length * i,
          hwAttr1: 'width',
          hwVal1: this.xScale.bandwidth() / this.valueFields.length,
          xyAttr2: 'y',
          xyVal2: this.yScale(v[1] - v[0]),
          hwAttr2: 'height',
          hwVal2: this.yScale(0) - this.yScale(v[1] - v[0])
        }
        break;
      case 'stacked':
      default:
        return {
          duration: 500,
          delay: j * 10,
          xyAttr1: 'y',
          xyVal1: this.yScale(v[1]),
          hwAttr1: 'height',
          hwVal1: this.yScale(v[0]) - this.yScale(v[1]),
          xyAttr2: 'x',
          xyVal2: this.xScale(j),
          hwAttr2: 'width',
          hwVal2: this.xScale.bandwidth()
        }
    }
  }

  transitionGrouped() {
    this.setState({barDisplay: 'grouped'})
  }

  transitionStacked() {
    this.setState({barDisplay: 'stacked'})
  }
}

StackedGroupedBarChart.defaultProps = {
  valueFieldsLabels: {},
  margin: {top: 40, right: 10, bottom: 40, left: 10}
}
