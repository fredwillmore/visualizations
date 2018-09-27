import React from "react"
import PropTypes from "prop-types"
import * as d3 from 'd3'

import VisualizationsHelpers from '../visualizations.js'
var vh = new VisualizationsHelpers

// import Axis from './Axis.jsx'

class Foo extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: [] }
    this.margin = props.margin
    this.innerWidth  = this.props.outerWidth  - this.margin.left - this.margin.right
    this.innerHeight = this.props.outerHeight - this.margin.top  - this.margin.bottom
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
      d[this.props.xColumn] = +d[this.props.xColumn]
      d[this.props.yColumn] = +d[this.props.yColumn]
      d[this.props.rColumn] = +d[this.props.rColumn]
    });
    return data
  }

  createScales() {
    this.xScale = vh.getScale(this.props.xScale).range([0, this.innerWidth])
    this.yScale = vh.getScale(this.props.yScale).range([this.innerHeight, 0])
    this.rScale = vh.getScale(this.props.rScale).range([this.props.radiusMin, this.props.radiusMax])
    
    this.colorScale = (i) => d3.rgb(this.props.colorScale[i])
    
    this.xScale.domain(d3.extent(this.state.data, (d) => d[this.props.xColumn]))
    this.yScale.domain(d3.extent(this.state.data, (d) => d[this.props.yColumn]))
    this.rScale.domain(d3.extent(this.state.data, (d) => d[this.props.rColumn]))

    this.yScale.domain(d3.extent(this.state.data, (d) => d[this.props.yColumn]))
    this.rScale.domain(d3.extent(this.state.data, (d) => d[this.props.rColumn]))
  }

  render(){
    this.createScales()

    return (
      <svg width = {this.props.outerWidth} height = {this.props.outerHeight}>
        <g transform = {`translate(${this.margin.left},${this.margin.top})`} >
          <defs>
            {
              this.state.data.map((d, i) => (
                <radialGradient
                  key = {i}
                  cx = "30%"
                  cy = "40%"
                  spreadMethod = "pad"
                  id = { "grad"+i }
                >
                  <stop
                    offset = "0%"
                    style = { {
                      stopColor: this.colorScale(d[this.props.colorColumn]).brighter(.7)
                    } }
                  />
                  <stop
                    offset = "100%"
                    style = { {
                      stopColor: this.colorScale(d[this.props.colorColumn])
                    } }
                  />
                </radialGradient>
              ))
            }
          </defs>
          <g>
            {
              this.state.data.map((d, i) => (
                <circle
                  key = {i}
                  cx = {this.xScale(d[this.props.xColumn])}
                  cy = {this.yScale(d[this.props.yColumn])}
                  r = {this.rScale(d[this.props.rColumn])}
                  fill = {`url(#grad${i})`}
                />
              ))
            }
          </g>
          <Axis
            axisType = 'x'
            className = "x axis"
            scale = {this.xScale}
            axis = {d3.axisBottom}
            tickFormat = ",.01f"
            labelText = {this.props.xAxisLabelText}
            labelOffset = {this.props.xAxisLabelOffset}
            width = {this.innerWidth}
            height = {this.innerHeight}
          >
          </Axis>
          <Axis
            axisType = 'y'
            className = "y axis"
            scale = {this.yScale}
            axis = {d3.axisLeft}
            tickFormat = ",.0f"
            width = {this.innerWidth}
            height = {this.innerHeight}
            labelText = {this.props.yAxisLabelText}
            labelOffset = {this.props.yAxisLabelOffset}
          />
        </g>
      </svg>
    )
  }
}

Foo.defaultProps = {
  selector: 'body',
  outerWidth: 900,
  outerHeight: 500,
  radiusMin: 1,
  radiusMax: 6,
  xColumn: "perihelion",
  yColumn: "aphelion",
  rColumn: "diameter",
  xAxisLabelText: "Perihelion (AU)",
  yAxisLabelText: "Aphelion (AU)",
  xAxisLabelOffset: 40,
  yAxisLabelOffset: 40,
  margin: { left: 60, top: 5, right: 5, bottom: 60 },
  colorColumn: "condition_code",
  xScale: 'log',
  yScale: 'log',
  rScale: 'linear'
}

export default Foo
