class BillboardTrack < ActiveRecord::Base
  belongs_to :billboard_artist
  has_many :billboard_chart_entries
  has_many :billboard_charts, through: :billboard_chart_entries

  def chart_trajectory
    billboard_chart_entries.select(
      'position', 'billboard_charts.chart_date AS chart_date'
    ).joins(
      :billboard_chart
    ).order('chart_date').map do |e|
      {x: e.chart_date, y: e.position}
    end
  end

  def self.charting_tracks start_date, end_date, options={}
    # return {a: 'hello', b: "there", start_date: start_date, end_date: end_date}
    top = options[:top] || 1
    bottom = options[:bottom] || 100
    q = joins(
      :billboard_chart_entries,
      :billboard_charts
    ).where(
      billboard_charts: {chart_date: start_date..end_date},
      billboard_chart_entries: {position: top..bottom}
    ).uniq(:id)
    if options[:limit]
      q = q.limit(options[:limit])
    end
    q
  end
end
