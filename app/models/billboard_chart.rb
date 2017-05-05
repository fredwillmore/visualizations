class BillboardChart < ActiveRecord::Base
  has_many :billboard_chart_entries
  scope :by_year, -> (year) { where(chart_date: (Date.new year)..(Date.new year+1)-1) }
end
