class BillboardTrack < ActiveRecord::Base
  belongs_to :billboard_artist
  has_many :billboard_chart_entries
  has_many :billboard_charts, through: :billboard_chart_entries

  def chart_trajectories
    entries = billboard_chart_entries.select(
      'position', 'billboard_charts.chart_date AS chart_date'
    ).joins(
      :billboard_chart
    ).order('chart_date')
    trajectories = []
    current_trajectory = []
    previous = current = nil
    entries.each do |e|
      previous = current
      current = e
      if previous && current.chart_date.to_date - previous.chart_date.to_date > 7
        if current_trajectory.count > 0
          trajectories << current_trajectory
          current_trajectory = []
        end
      end
      current_trajectory << {x: current.chart_date, y: current.position}
    end
    if current_trajectory.count > 0
      trajectories << current_trajectory
    end

    trajectories
  end

  def self.charting_tracks start_date, end_date, options={}
    # return {a: 'hello', b: "there", start_date: start_date, end_date: end_date}
    top = options[:top] || 1
    bottom = options[:bottom] || 100
    q = joins(
      :billboard_chart_entries,
      :billboard_charts
    # ).where(
    #   'name LIKE ?', "%Christmas%"
    ).where(
      { billboard_charts: {chart_date: start_date..end_date},
        billboard_chart_entries: {position: top..bottom}}

    ).uniq(:id)
    if options[:limit]
      q = q.limit(options[:limit])
    end
    q
  end
end
