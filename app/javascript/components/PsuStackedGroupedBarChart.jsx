import StackedGroupedBarChart from './StackedGroupedBarChart.jsx'
import PsuDataLegend from './PsuDataLegend.jsx'

class PsuStackedGroupedBarChart extends React.Component {
  constructor (props) {
    super(props)
  }

  colorScale () {
    return d3.scaleOrdinal()
        .domain([ 'asi_f', 'asi_m', 'blk_f', 'blk_m', 'his_f', 'his_m',
          'ind_f', 'ind_m', 'pac_f', 'pac_m', 'tot_f', 'tot_m', 'two_f',
          'two_m', 'unk_f', 'unk_m', 'wht_f', 'wht_m' ])
        .range(d3.schemeCategory10)
  }

  render(){
    return (
      <StackedGroupedBarChart
        width = {960}
        height = {500}
        valueFieldsLabels = {{
          asi_f: "#{get_ethnicity :asi} Female",
          asi_m: "#{get_ethnicity :asi} Male",
          blk_f: "#{get_ethnicity :blk} Female",
          blk_m: "#{get_ethnicity :blk} Male",
          his_f: "#{get_ethnicity :his} Female",
          his_m: "#{get_ethnicity :his} Male",
          ind_f: "#{get_ethnicity :ind} Female",
          ind_m: "#{get_ethnicity :ind} Male",
          pac_f: "#{get_ethnicity :pac} Female",
          pac_m: "#{get_ethnicity :pac} Male",
          // tot_f: "#{get_ethnicity :tot} Female",
          // tot_m: "#{get_ethnicity :tot} Male",
          two_f: "#{get_ethnicity :two} Female",
          two_m: "#{get_ethnicity :two} Male",
          unk_f: "#{get_ethnicity :unk} Female",
          unk_m: "#{get_ethnicity :unk} Male",
          wht_f: "#{get_ethnicity :wht} Female",
          wht_m: "#{get_ethnicity :wht} Male"
        }}
        groupBy = 'program'
        dataUrl = "/visualizations/psu_data.json?year=#{params[:year]}"
        xAxisLabelText = 'Program'
        yAxisLabelText = 'Number of Graduates'
        xAxisLabelOffset = {30}
        yAxisLabelOffset = {30}
        colorScale = {this.colorScale()}
        >

        <PsuDataLegend
          colorScale = {this.colorScale()}
          x = {100}
          y = {40}
        />

      </StackedGroupedBarChart>
    )
  }
}

export default PsuStackedGroupedBarChart
