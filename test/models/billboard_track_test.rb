require 'test_helper'

class BillboardTrackTest < ActiveSupport::TestCase

  setup do
    @track = FactoryGirl.create :billboard_track
  end

  test "trajectories calls Trajectory.chart_trajectories" do
    assert_send([Trajectory, :track_trajectories, @track]) do
      @track.chart_trajectories
    end
  end
  
end
