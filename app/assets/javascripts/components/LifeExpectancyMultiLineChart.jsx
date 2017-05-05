class LifeExpectancyMultiLineChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      xMin: this.props.xMin,
      xMax: this.props.xMax,
      yMin: this.props.yMin,
      yMax: this.props.yMax
    }
  }

  render () {
    return (
      <MultiLineChart
        dataUrl = {this.props.dataUrl}
        headerText = {this.props.headerText}
        subHeaderText = {this.props.subHeaderText}
        xMin = {this.state.xMin}
        xMax = {this.state.xMax}
        yMin = {this.state.yMin}
        yMax = {this.state.yMax}
        xTickFormat = {(d) => d.toString()}
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
        getHeaderText = {(d) => d.CountryName}
        getSubheaderText = {(d) => {
          var startVal = d.values[0].y,
            endVal = d.values[d.values.length-1].y,
            startYear = d.values[0].x,
            endYear = d.values[d.values.length-1].x,
            countryName = d.CountryName;
          var percentChange = 100 * (endVal - startVal) / startVal;
          return `On average: a life expectancy of ${Math.round(startVal)} years in ${startYear} and ${Math.round(endVal)} years in ${endYear},
            ${percentChange>=0 ? 'an increase of ' : 'a decrease of '} ${Math.abs(Math.round(percentChange))} percent`
        }}
      ></MultiLineChart>
    )
  }
}

LifeExpectancyMultiLineChart.defaultProps = {
  xMin: 1960,
  xMax: 2010,
  yMin: 20,
  yMax: 80,
  width: 925,
  height: 550,
}
