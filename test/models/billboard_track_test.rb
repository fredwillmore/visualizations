require 'test_helper'

class BillboardTrackTest < ActiveSupport::TestCase

  setup do
    @track = FactoryGirl.create :billboard_track
  end

  test "chart_trajectories returns an empty array if not entries found" do
    assert_equal @track.chart_trajectories, []
  end

  test "chart_trajectories returns an array with a single trajectory" do
    @chart_one = FactoryGirl.create :billboard_chart, chart_date: '1977-05-25'
    @chart_two = FactoryGirl.create :billboard_chart, chart_date: '1977-06-26'
    
    @entry = FactoryGirl.create :billboard_chart_entry, billboard_chart: @chart_one, billboard_track: @track, position: 55
    assert_equal @track.chart_trajectories, [[{x: @chart_one.chart_date.to_s, y: @entry.position }]]
  end

  test "chart_trajectories returns an array with two trajectories if the trajectories are not contiguous" do
    @chart_one = FactoryGirl.create :billboard_chart, chart_date: '1977-05-25'
    @chart_two = FactoryGirl.create :billboard_chart, chart_date: '1977-06-01'
    @chart_three = FactoryGirl.create :billboard_chart, chart_date: '1977-06-22'
    @entry_one = FactoryGirl.create :billboard_chart_entry, billboard_chart: @chart_one, billboard_track: @track, position: 55
    @entry_two = FactoryGirl.create :billboard_chart_entry, billboard_chart: @chart_two, billboard_track: @track, position: 66
    @entry_three = FactoryGirl.create :billboard_chart_entry, billboard_chart: @chart_three, billboard_track: @track, position: 77

    assert_equal @track.chart_trajectories, [
      [ {x: @chart_one.chart_date.to_s, y: @entry_one.position },
        {x: @chart_two.chart_date.to_s, y: @entry_two.position } ],
      [ {x: @chart_three.chart_date.to_s, y: @entry_three.position } ]
    ]
  end
  
end
