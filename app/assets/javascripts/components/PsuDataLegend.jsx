class PsuDataLegend extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    var boxWidth = 16
    var labels = {
      // nra: 'Nonresident aliens',
      asi: 'Asian American',
      blk: 'Black',
      his: 'Hispanic',
      ind: 'American Indian',
      pac: 'Pacific Islander',
      unk: 'Unknown',
      wht: 'White',
      // tot: 'Program Totals',
      two: 'Two or More'
    }
    var marginLeft = boxWidth/2
    var space = boxWidth/4
    var xSpace = boxWidth + space
    var ySpace = boxWidth + space
    var legendWidth = 180
    var legendHeight = (Object.keys(labels).length+1) * ySpace

    return(
      <g transform={`translate(${this.props.x},${this.props.y})`}>
        <rect x="0" y="0" width={legendWidth} height={legendHeight} stroke='black' fill="white" />

        <text x={boxWidth} y={boxWidth * 3/4} fontSize={`${boxWidth/2}pt`} textAnchor="middle">M</text>
        <text x="36" y="12" fontSize="8pt" textAnchor="middle">F</text>

        {
          Object.keys(labels).map((key, i) => {
            var label = labels[key]
            var mFill = this.props.colorScale(`${key}_m`),
              fFill = this.props.colorScale(`${key}_f`)
            var y = boxWidth + (i)*ySpace
            return (
              <g key={key}>
                <rect
                  x={marginLeft}
                  y={y}
                  width={boxWidth}
                  height={boxWidth}
                  fill={mFill}
                />
                <rect
                  x={marginLeft + xSpace}
                  y={y}
                  width={boxWidth}
                  height={boxWidth}
                  fill={fFill}
                />
                <text
                  x={marginLeft + xSpace*2}
                  y={y + boxWidth/2}
                  alignmentBaseline='middle'
                  fontSize="8pt"
                  textAnchor="left"
                >
                  {label}
                </text>
              </g>
            )
          })
        }

      </g>
    )
  }
}
