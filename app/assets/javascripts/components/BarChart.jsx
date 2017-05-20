class BarChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      innerWidth: props.width - props.margin.left - props.margin.right,
      innerHeight: props.height - props.margin.top - props.margin.bottom
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

  formatData(data) {
    data.forEach((d) => {
      d[this.props.valueField] = +d[this.props.valueField];
      if(isNaN(d[this.props.valueField])){
        d[this.props.valueField] = 0;
      }
    });
    return data;
  }

  createScales(){
    this.xScale = d3.scaleBand()
      .range([0, this.state.innerWidth])
      .padding(0.1)
      .domain(this.state.data.map((d) => d[this.props.labelField]));
    this.yScale = getScale(this.props.yScale)
      .range([this.state.innerHeight, 0])
      .domain([1, d3.max(this.state.data, (d) => d[this.props.valueField])]);
    // don't really need a scale for color - just using one color for this chart
    this.colorScale = getScale('color');
    this.brightnessScale = getScale('linear').domain([0,5]).range([0,1]);
  }

  render(){
    this.createScales()
    return (
      <svg
        width = {this.props.width}
        height = {this.props.height}
      >
        <g transform = {`translate(${this.props.margin.left},${this.props.margin.top})`} >
          {
            this.state.data.map((d, i) => (
                <Rect
                  key = {i}
                  fill = {d3.rgb(this.colorScale(0)).brighter(this.brightnessScale(i))}
                  x = {this.xScale(d[this.props.labelField])}
                  width = {this.xScale.bandwidth()}
                  y = {this.yScale(d[this.props.valueField])}
                  height = {this.state.innerHeight - this.yScale(d[this.props.valueField])}
                />
              )
            )
          }
          <Axis
            transform = {`translate(0, ${this.state.innerHeight})`}
            width = '90'
            scale = {this.xScale}
            axis = {d3.axisBottom}
            wrapWidth = {this.xScale.bandwidth()}
            width = {this.state.innerWidth}
            height = {this.state.innerHeight}
            labelText = {this.props.xAxisLabelText}
            labelOffset = {this.props.xAxisLabelOffset}
          />
          <Axis
            scale = {this.yScale}
            axis = {d3.axisLeft}
            tickFormat = ",.0f"
            width = {this.state.innerWidth}
            height = {this.state.innerHeight}
            labelText = {this.props.xAxisLabelText}
            labelOffset = {this.props.xAxisLabelOffset}
          />
        </g>
      </svg>
    );
  }
}

BarChart.defaultProps = {
  selector: 'body',
  data: [],
  labelField: 'label',
  valueField: 'count',
  margin: {top: 20, right: 20, bottom: 60, left: 80},
  width: 960,
  height: 500,
  yScale: 'linear'
}
