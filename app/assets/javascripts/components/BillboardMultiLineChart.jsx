class BillboardMultiLineChart extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <MultiLineChart
        dataUrl = {this.props.dataUrl}
        headerText = {this.props.headerText}
        subHeaderText = {this.props.subHeaderText}
        xMin = {new Date(Date.parse(this.props.startDate))}
        xMax = {new Date(Date.parse(this.props.endDate))}
        yMin = {this.props.yMin}
        yMax = {this.props.yMax}
        width = {1200}
        height = {600}
        xScale = {this.props.xScale}
        xTicks = {this.props.xTicks}
        xTickFormat = {this.props.xTickFormat}
        yTicks = {this.props.yTicks}
        yTickFormat = {this.props.yTickFormat}
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
    )
  }
}

BillboardMultiLineChart.defaultProps = {
  yMin: 100,
  yMax: 1,
  xScale: 'date',
  xTicks: 12,
  // xTickFormat: (d) => new Date(d).toLocaleDateString("en-US", { month: 'long', day: 'numeric' })
  yTicks: 100,
  yTickFormat: (d) => (d == 1 || 0 == d%10) ? d : ''
}
