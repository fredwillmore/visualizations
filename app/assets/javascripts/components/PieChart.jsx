class PieChart extends React.Component {
  constructor (props) {
    super(props)

    this.state = { data: [] }
    this.radius = Math.min(props.width, props.height) / 2
    this.pathOuterRadius = this.radius - 10
    this.pathInnerRadius = 0
    this.labelOuterRadius = this.radius - 40
    this.labelInnerRadius = this.radius - 40

    this.path = (d) => d3.arc().outerRadius(this.pathOuterRadius).innerRadius(this.pathInnerRadius)(d)
    this.label = (d) => d3.arc().outerRadius(this.labelOuterRadius).innerRadius(this.labelInnerRadius).centroid(d)
    this.labelText = (d) => d.data[this.props.labelField]
    this.fill = (d) => this.colorScale(d.data[this.props.labelField])
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
      var value = d[this.props.valueField]
      value = +value;
      if(isNaN(value)){
        value = 0;
      }
      d[this.props.valueField] = value
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
    return (
      <svg width = {this.props.width} height = {this.props.height}>
        <g transform = {`translate(${this.props.width / 2},${this.props.height / 2})`} >
          {
            this.state.data.map((d, i) => (
              <PieSlice 
                key = {i}
                d = {this.path(d)}
                fill = {this.fill(d)}
                stroke = "#fff"
              >
                <text
                  transform = {`translate(${this.label(d)})`}
                  dy = "0.35em"
                >
                  {this.labelText(d)}
                </text>
              </PieSlice>
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
