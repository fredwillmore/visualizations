def split_by_attribute_diff array, split_size, attribute = :itself    
  groups = array.sort_by(&attribute).slice_when do |a,b|
    b.send(attribute) - a.send(attribute) >= split_size
  end  
end

class Trajectory
  # belongs_to :billboard_track
  def self.track_trajectories track
    entries = track.billboard_chart_entries.joins :billboard_chart
    groups = split_by_attribute_diff entries, 10, :chart_date
    trajectories = groups.map do |group|
      group.map do |entry|
        {x: entry.chart_date.to_s, y: entry.position}
      end
    end
  end
  
end

