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
      post :create, billboard_chart: { chart_date: @billboard_chart.chart_date }
    end

    assert_redirected_to billboard_chart_path(assigns(:billboard_chart))
  end

  test "should show billboard_chart" do
    get :show, id: @billboard_chart
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @billboard_chart
    assert_response :success
  end

  test "should update billboard_chart" do
    patch :update, id: @billboard_chart, billboard_chart: { chart_date: @billboard_chart.chart_date }
    assert_redirected_to billboard_chart_path(assigns(:billboard_chart))
  end

  test "should destroy billboard_chart" do
    assert_difference('BillboardChart.count', -1) do
      delete :destroy, id: @billboard_chart
    end

    assert_redirected_to billboard_charts_path
  end
end
