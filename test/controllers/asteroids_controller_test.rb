require 'test_helper'

class AsteroidsControllerTest < ActionController::TestCase
  setup do
    @asteroid = asteroids(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:asteroids)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create asteroid" do
    assert_difference('Asteroid.count') do
      post :create, asteroid: {  }
    end

    assert_redirected_to asteroid_path(assigns(:asteroid))
  end

  test "should show asteroid" do
    get :show, id: @asteroid
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @asteroid
    assert_response :success
  end

  test "should update asteroid" do
    patch :update, id: @asteroid, asteroid: {  }
    assert_redirected_to asteroid_path(assigns(:asteroid))
  end

  test "should destroy asteroid" do
    assert_difference('Asteroid.count', -1) do
      delete :destroy, id: @asteroid
    end

    assert_redirected_to asteroids_path
  end
end
