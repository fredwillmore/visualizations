class LifeExpectancyMultiLineChart extends React.Component {
  constructor (props) {
    super(props)
  }

  createScales() {
    this.colorScale = d3.scaleLinear().domain([1,10]).range(["darkgreen","lightgreen"])
  }

  render () {
    this.createScales()
    return (
      <MultiLineChart
        dataUrl = {this.props.dataUrl}
        headerText = {this.props.headerText}
        subHeaderText = {this.props.subHeaderText}
        xMin = {this.props.xMin}
        xMax = {this.props.xMax}
        yMin = {this.props.yMin}
        yMax = {this.props.yMax}
        width = {this.props.width}
        height = {this.props.height}
        xTickFormat = {(d) => d.toString()}
        xAxisLabelText = {this.props.xAxisLabelText}
        yAxisLabelText = {this.props.yAxisLabelText}
        formatData = {(data) => {
          var headers = data[0]
          formattedData = data.slice(1, data.length).map((d) => {
            val = {values: []}
            headers.forEach((v,k) => {
              if(isNaN(+v)){
                val[v] = d[k]
              } else {
                if(+d[k]){
                  val.values.push({x: v, y: d[k]})
                }
              }
            })
            return val
          })
          return formattedData
        }}
        getHeaderText = {(d) => `${d.CountryName} - ${d.RegionName.replace(/&amp;/g, '&')}`}
        getSubheaderText = {(d) => {
          var startVal = d.values[0].y,
            endVal = d.values[d.values.length-1].y,
            startYear = d.values[0].x,
            endYear = d.values[d.values.length-1].x,
            countryName = d.CountryName;
          var percentChange = 100 * (endVal - startVal) / startVal
          return `On average: a life expectancy of ${Math.round(startVal)} years in ${startYear} and ${Math.round(endVal)} years in ${endYear},
            ${percentChange>=0 ? 'an increase of ' : 'a decrease of '} ${Math.abs(Math.round(percentChange))} percent`
        }}
        getHighlightedItemID = {(d) => d.RegionCode }
        getCurrentItemID = {(d) => d.CountryCode}
        getClickedItemID = {(d) => d.CountryCode}
        strokeColor = {(d) => {
          if(isNaN(d[this.props.colorIndex])){
            return d3.color(this.props.strokeColorDefault)
          } else {
            return this.colorScale(d[this.props.colorIndex])
          }
        }}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor = {this.props.strokeColorLower} stopOpacity = {1} />
            <stop offset="100%" stopColor = {this.props.strokeColorUpper} stopOpacity = {1} />
          </linearGradient>
        </defs>
        <g transform="translate(30,30)">
          <text x="0" y="0" textAnchor="start" fontWeight="bold">{this.props.colorIndexDescription}</text>
          <rect y="7" width="160" height="18" fill="url(#grad1)" stroke='darkgray'></rect>
          <text x="0" y="40" textAnchor="start">{this.colorScale.domain()[0]}</text>
          <text x="160" y="40" textAnchor="end">{this.colorScale.domain()[1]}</text>

          <rect x="180" y="7" width="18" height="18" fill={this.props.strokeColorDefault} stroke='darkgray'></rect>
          <text x="189" y="40" textAnchor="middle">n/a</text>
        </g>
      </MultiLineChart>
    )
  }

}

LifeExpectancyMultiLineChart.defaultProps = {
  xMin: 1960,
  xMax: 2010,
  yMin: 20,
  yMax: 90,
  width: 790,
  height: 550,
  colorIndex: 'WellBeing',
  colorIndexDescription: 'Well Being Index',
  strokeColorDefault: 'lightgray',
  strokeColorLower: 'darkgreen',
  strokeColorUpper: 'lightgreen',
  xAxisLabelText: 'Year',
  yAxisLabelText: 'Average Lifespan By Country'
}
