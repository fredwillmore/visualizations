class BillboardTrack < ActiveRecord::Base
  belongs_to :billboard_artist
  has_many :billboard_chart_entries
  has_many :billboard_charts, through: :billboard_chart_entries
  
  def trajectories
    Trajectory.track_trajectories self
  end
  
  def chart_trajectories
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
