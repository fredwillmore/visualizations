require 'test_helper'

class BillboardArtistsControllerTest < ActionController::TestCase
  setup do
    @billboard_artist = billboard_artists(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:billboard_artists)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create billboard_artist" do
    assert_difference('BillboardArtist.count') do
      post :create, billboard_artist: { name: @billboard_artist.name }
    end

    assert_redirected_to billboard_artist_path(assigns(:billboard_artist))
  end

  test "should show billboard_artist" do
    get :show, id: @billboard_artist
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @billboard_artist
    assert_response :success
  end

  test "should update billboard_artist" do
    patch :update, id: @billboard_artist, billboard_artist: { name: @billboard_artist.name }
    assert_redirected_to billboard_artist_path(assigns(:billboard_artist))
  end

  test "should destroy billboard_artist" do
    assert_difference('BillboardArtist.count', -1) do
      delete :destroy, id: @billboard_artist
    end

    assert_redirected_to billboard_artists_path
  end
end
