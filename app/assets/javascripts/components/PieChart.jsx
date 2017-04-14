class PieChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: [] }
    this.radius = Math.min(props.width, props.height) / 2
    this.pathOuterRadius = this.radius - 10
    this.pathInnerRadius = 0
    this.labelOuterRadius = this.radius - 40
    this.labelInnerRadius = this.radius - 40
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
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
    })
    return d3.pie()
      .sort(null)
      .value((d) => d[this.props.valueField]
    )(data);
  }

  createScales() {
    this.colorScale = d3.scaleOrdinal(eval('d3.'+this.props.colorScheme))
  }

  render(){
    this.createScales()

    var path = d3.arc().outerRadius(this.pathOuterRadius).innerRadius(this.pathInnerRadius);
    var label = d3.arc().outerRadius(this.labelOuterRadius).innerRadius(this.labelInnerRadius);

    return (
      <svg width = {this.props.width} height = {this.props.height}>
        <g transform = {`translate(${this.props.width / 2},${this.props.height / 2})`} >
          {
            this.state.data.map((d, i) => (
              <g className="arc" key={i}>
                <path
                  d = {path(d)}
                  fill = {this.colorScale(d.data[this.props.labelField])}
                  stroke = "#fff"
                >
                </path>
                <text
                  transform = {`translate(${label.centroid(d)})`}
                  dy = "0.35em"
                >
                  {d.data[this.props.labelField]}
                </text>
              </g>
            ))
          }
        </g>
      </svg>
    )
  }
}

PieChart.defaultProps = {
  top: 20,
  width: 500,
  height: 500,
  colorScheme: 'schemeCategory10',
  labelField: 'label',
  valueField: 'count'
}
