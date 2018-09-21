require 'test_helper'

class BillboardChartEntriesControllerTest < ActionController::TestCase
  setup do
    @billboard_chart_entry = billboard_chart_entries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:billboard_chart_entries)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create billboard_chart_entry" do
    assert_difference('BillboardChartEntry.count') do
      post :create, params: { 
        billboard_chart_entry: { 
          last_week_position: @billboard_chart_entry.last_week_position, 
          position: @billboard_chart_entry.position, 
          peak_position: @billboard_chart_entry.peak_position 
        } 
      }
    end

    assert_redirected_to billboard_chart_entry_path(assigns(:billboard_chart_entry))
  end

  test "should show billboard_chart_entry" do
    get :show, params: {id: @billboard_chart_entry}
    assert_response :success
  end

  test "should get edit" do
    get :edit, params: {id: @billboard_chart_entry}
    assert_response :success
  end

  test "should update billboard_chart_entry" do
    patch :update, params: {
      id: @billboard_chart_entry, 
      billboard_chart_entry: { 
        chart_entry_date: @billboard_chart_entry.chart_entry_date, 
        position: @billboard_chart_entry.position, 
        peak_position: @billboard_chart_entry.peak_position 
      }
    }
    assert_redirected_to billboard_chart_entry_path(assigns(:billboard_chart_entry))
  end

  test "should destroy billboard_chart_entry" do
    assert_difference('BillboardChartEntry.count', -1) do
      delete :destroy, params: {id: @billboard_chart_entry}
    end

    assert_redirected_to billboard_chart_entries_path
  end
end
