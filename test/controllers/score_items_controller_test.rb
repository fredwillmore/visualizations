require 'test_helper'

class ScoreItemsControllerTest < ActionController::TestCase
  setup do
    @score_item = score_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:score_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create score_item" do
    assert_difference('ScoreItem.count') do
      post :create, score_item: {  }
    end

    assert_redirected_to score_item_path(assigns(:score_item))
  end

  test "should show score_item" do
    get :show, id: @score_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @score_item
    assert_response :success
  end

  test "should update score_item" do
    patch :update, id: @score_item, score_item: {  }
    assert_redirected_to score_item_path(assigns(:score_item))
  end

  test "should destroy score_item" do
    assert_difference('ScoreItem.count', -1) do
      delete :destroy, id: @score_item
    end

    assert_redirected_to score_items_path
  end
end
