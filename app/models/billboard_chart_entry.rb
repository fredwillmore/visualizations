class BillboardChartEntry < ActiveRecord::Base
  belongs_to :billboard_track
  belongs_to :billboard_chart
  
  def chart_date
    billboard_chart ? billboard_chart.chart_date : nil
  end
end
