require 'test_helper'

class BillboardTracksControllerTest < ActionController::TestCase
  setup do
    @billboard_track = billboard_tracks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:billboard_tracks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create billboard_track" do
    assert_difference('BillboardTrack.count') do
      post :create, billboard_track: { artist_id: @billboard_track.artist_id, string: @billboard_track.string }
    end

    assert_redirected_to billboard_track_path(assigns(:billboard_track))
  end

  test "should show billboard_track" do
    get :show, id: @billboard_track
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @billboard_track
    assert_response :success
  end

  test "should update billboard_track" do
    patch :update, id: @billboard_track, billboard_track: { artist_id: @billboard_track.artist_id, string: @billboard_track.string }
    assert_redirected_to billboard_track_path(assigns(:billboard_track))
  end

  test "should destroy billboard_track" do
    assert_difference('BillboardTrack.count', -1) do
      delete :destroy, id: @billboard_track
    end

    assert_redirected_to billboard_tracks_path
  end
end
