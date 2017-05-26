
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
        d[field] = +d[field]
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
    this.y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz))
    this.yMax = d3.max(yz, (y) => d3.max(y))
    this.y1Max = d3.max(this.y01z, (y) => d3.max(y, (d) => d[1]))

    this.xScale = d3.scaleBand()
      .domain(xz)
      .rangeRound([0, this.innerWidth])
      .padding(0.08)

    this.yScale = d3.scaleLinear()
      .domain([0, this.y1Max])
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
            this.y01z.map((d, i) => (
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
            axisType = 'x'
            width = {this.innerWidth}
            height = {this.innerHeight}
            scale = {this.xScale}
            axis = {d3.axisBottom}
            wrapWidth = {this.xScale.bandwidth()}
            tickFormat = {(d) => this.metadataLookup[this.props.groupBy][d]}
            labelText = {this.props.xAxisLabelText}
            labelOffset = {this.props.xAxisLabelOffset}
          />
          <Axis
            axisType = 'y'
            width = {this.innerWidth}
            height = {this.innerHeight}
            scale = {this.yScale}
            axis = {d3.axisLeft}
            ticks = '10'
            tickFormat = {(d) => d}
            labelText = {this.props.yAxisLabelText}
            labelOffset = {this.props.yAxisLabelOffset}
          />
        </g>
      </svg>
    </div>
    )
  }

  // TODO: this still sucks
  getTransitionAttributes(v, j, i){
    switch (this.state.barDisplay) {
      case 'grouped':
        return [{
          duration: 500,
          delay: j * 10,
          x: this.xScale(j) + this.xScale.bandwidth() / this.valueFields.length * i,
          width: this.xScale.bandwidth() / this.valueFields.length
        }, {
          y: this.yScale(v[1] - v[0]),
          height: this.yScale(0) - this.yScale(v[1] - v[0])
        }]
        break;
      case 'stacked':
      default:
        console.log(this.yScale)
        return [{
          duration: 500,
          delay: j * 10,
          y: this.yScale(v[1]),
          height: this.yScale(v[0]) - this.yScale(v[1])
        }, {
          x: this.xScale(j),
          width: this.xScale.bandwidth()
        }]
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
  margin: {top: 10, right: 10, bottom: 50, left: 50}
}
