require 'test_helper'

class BillboardTrackTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  setup do
    @billboard_track_one = FactoryBot.create :billboard_track
    @billboard_track_two = FactoryBot.create :billboard_track
    @billboard_chart_one = FactoryBot.create :billboard_chart, chart_date: '1977-05-25'
    @billboard_chart_two = FactoryBot.create :billboard_chart, chart_date: '1977-06-26'
    @billboard_chart_entry_one = FactoryBot.create :billboard_chart_entry, billboard_chart: @billboard_chart_one, billboard_track: @billboard_track_one, position: 55
    @billboard_chart_entry_two = FactoryBot.create :billboard_chart_entry, billboard_chart: @billboard_chart_two, billboard_track: @billboard_track_two
  end

  test "chart_trajectory does things" do
    assert_equal @billboard_track_one.chart_trajectories[0], 
      [{
        x: @billboard_chart_one.chart_date, 
        y: @billboard_chart_entry_one.position 
      }]
  end

end
