require 'test_helper'

class ScoreCategoriesControllerTest < ActionController::TestCase
  setup do
    @score_category = score_categories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:score_categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create score_category" do
    assert_difference('ScoreCategory.count') do
      post :create, params: {score_category: {  }}
    end

    assert_redirected_to score_category_path(assigns(:score_category))
  end

  test "should show score_category" do
    get :show, params: {id: @score_category}
    assert_response :success
  end

  test "should get edit" do
    get :edit, params: {id: @score_category}
    assert_response :success
  end

  test "should update score_category" do
    patch :update, params: {id: @score_category, score_category: {  }}
    assert_redirected_to score_category_path(assigns(:score_category))
  end

  test "should destroy score_category" do
    assert_difference('ScoreCategory.count', -1) do
      delete :destroy, params: {id: @score_category}
    end

    assert_redirected_to score_categories_path
  end
end
