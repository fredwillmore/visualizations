class BillboardTrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :trajectory, :entry_date, :peak, :weeks
  has_one :billboard_artist

  def trajectory
    @object.chart_trajectory
  end

  def entry_date
    first_chart_entry.chart_entry_date
  end

  def peak
    first_chart_entry.peak_position
  end

  def weeks
    first_chart_entry.weeks_on_chart
  end

  private

  def first_chart_entry
    @first_chart_entry ||= @object.billboard_chart_entries.first
  end

end
