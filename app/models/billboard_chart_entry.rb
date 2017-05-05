class BillboardChartEntry < ActiveRecord::Base
  belongs_to :billboard_track
  belongs_to :billboard_chart
end
