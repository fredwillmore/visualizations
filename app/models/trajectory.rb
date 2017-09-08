def split_by_attribute_diff array, split_size, attribute = :itself    
  groups = []
  current_group = []
  previous = current = nil
  array.sort_by(&attribute).each do |e|
    previous = current
    current = e
    if previous && current.send(attribute) - previous.send(attribute) > split_size
      if current_group.count > 0
        groups << current_group
        current_group = []
      end
    end
    current_group << current
  end
  if current_group.count > 0
    groups << current_group
  end

  groups
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

