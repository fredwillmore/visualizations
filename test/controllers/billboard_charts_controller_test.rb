require 'test_helper'

class BillboardChartsControllerTest < ActionController::TestCase
  setup do
    @billboard_chart = billboard_charts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:billboard_charts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create billboard_chart" do
    assert_difference('BillboardChart.count') do
      post :create, params: {billboard_chart: { chart_date: @billboard_chart.chart_date }}
    end

    assert_redirected_to billboard_chart_path(assigns(:billboard_chart))
  end

  test "should show billboard_chart" do
    get :show, params: {id: @billboard_chart.id}
    assert_response :success
  end

  test "should get edit" do
    get :edit, params: {id: @billboard_chart.id}
    assert_response :success
  end

  test "should update billboard_chart" do
    patch :update, params: {id: @billboard_chart.id, billboard_chart: { chart_date: @billboard_chart.chart_date }}
    assert_redirected_to billboard_chart_path(assigns(:billboard_chart))
  end

  test "should destroy billboard_chart" do
    assert_difference('BillboardChart.count', -1) do
      delete :destroy, params: {id: @billboard_chart.id}
    end

    assert_redirected_to billboard_charts_path
  end
end
