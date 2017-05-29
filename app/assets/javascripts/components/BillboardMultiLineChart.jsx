class BillboardMultiLineChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataUrl: this.props.dataUrl,
      yMin: this.props.yMin,
      yMax: this.props.yMax,
      startDate: this.props.startDate,
      endDate: this.props.endDate
    }
  }

  componentDidMount() {
    this.resetChartParams()
  }

  componentWillReceiveProps(nextProps) {
    this.resetChartParams()
  }

  getDataUrl() {
    var chartLength = $("[name='chart_length']").val() || 40
    var year = $("[name='year']").val() || 1977
    return `/visualizations/billboard_multi_line_chart?chart_length=${chartLength}&year=${year}&use_flat_file=${true}`
  }

  resetChartParams() {
    if(!$("[name='chart_length']").val()){
      $("[name='chart_length']").val(40)
    }
    if(!$("[name='year']").val()){
      $("[name='year']").val(1977)
    }
    var chartLength = $("[name='chart_length']").val()
    var year = $("[name='year']").val()
    this.setState({
      dataUrl: `/visualizations/billboard_multi_line_chart?chart_length=${chartLength}&year=${year}&use_flat_file=${true}`,
      yMin: chartLength,
      yMax: 0,
      startDate: `${year}-01-01`,
      endDate: `${year}-12-31`,
      headerText: `Billboard Top ${chartLength} for ${year}`
    })
  }

  yearOptions() {
    var years = []
    for(i=1940; i<=2015; i++) { years.push(i) }
    return years.map((current) => (
      <option key={current} value={current}>{current}</option>
    ))
  }

  chartLengthOptions() {
    return [10, 40, 100].map((current) => (
      <option key={current} value={current}>Top {current}</option>
    ) )
  }

  render () {
    return (
      <div>
        <select name="chart_length" onChange={this.resetChartParams.bind(this)}>
          {this.chartLengthOptions()}
        </select>
        <select name="year" onChange={this.resetChartParams.bind(this)}>
          {this.yearOptions()}
        </select>

        <MultiLineChart
          dataUrl = {this.state.dataUrl}
          headerText = {this.state.headerText}
          subHeaderText = {this.props.subHeaderText}
          xMin = {new Date(Date.parse(this.state.startDate))}
          xMax = {new Date(Date.parse(this.state.endDate))}
          yMin = {this.state.yMin}
          yMax = {this.state.yMax}
          width = {this.props.width}
          height = {this.props.height}
          xScale = {this.props.xScale}
          xTicks = {this.props.xTicks}
          xTickFormat = {this.props.xTickFormat}
          yTicks = {this.props.yTicks}
          yTickFormat = {this.props.yTickFormat}
          xAxisLabelText = {this.props.xAxisLabelText}
          yAxisLabelText = {this.props.yAxisLabelText}
          getHeaderText = {(d) => `${d.billboard_artist.name} - ${d.name}`}
          getSubheaderText = {(d) => `Entered the charts on ${new Date(Date.parse(d.entry_date)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}. On the chart for a total of ${d.weeks} weeks. Peaked at number ${d.peak}.` }
          getCurrentItemID = {(d) => d.id}
          formatData = {(data) => {
            formattedData = data.map((d) => {
              val = {
                id: d.id,
                billboard_artist: d.billboard_artist,
                name: d.name,
                entry_date: d.entry_date,
                peak: d.peak,
                weeks: d.weeks,
                values: d.trajectories.map((trajectory) => {
                  return trajectory.map((entry) => {
                    return {x: new Date(Date.parse(entry.x)), y: entry.y}
                  })
                })
              }
              return val
            })
            return formattedData
          }}
          getHighlightedItemID = {(d) => d.billboard_artist.id}
          getClickedItemID = {(d) => d.id}

        >
        </MultiLineChart>
      </div>
    )
  }
}

BillboardMultiLineChart.defaultProps = {
  yMin: 100,
  yMax: 1,
  xScale: 'date',
  xTicks: 12,
  width: 1200,
  height: 600,
  // xTickFormat: (d) => new Date(d).toLocaleDateString("en-US", { month: 'long', day: 'numeric' })
  yTicks: 100,
  yTickFormat: (d) => (d == 1 || 0 == d%10) ? d : '',
  xAxisLabelText: 'Date',
  yAxisLabelText: 'Chart Position'
}
