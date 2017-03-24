require 'test_helper'

class CometsControllerTest < ActionController::TestCase
  setup do
    @comet = comets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:comets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create comet" do
    assert_difference('Comet.count') do
      post :create, comet: {  }
    end

    assert_redirected_to comet_path(assigns(:comet))
  end

  test "should show comet" do
    get :show, id: @comet
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @comet
    assert_response :success
  end

  test "should update comet" do
    patch :update, id: @comet, comet: {  }
    assert_redirected_to comet_path(assigns(:comet))
  end

  test "should destroy comet" do
    assert_difference('Comet.count', -1) do
      delete :destroy, id: @comet
    end

    assert_redirected_to comets_path
  end
end
