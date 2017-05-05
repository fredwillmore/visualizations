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
      post :create, billboard_chart_entry: { belongs_to: @billboard_chart_entry.belongs_to, belongs_to: @billboard_chart_entry.belongs_to, belongs_to: @billboard_chart_entry.belongs_to, date: @billboard_chart_entry.date, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, peak_position: @billboard_chart_entry.peak_position }
    end

    assert_redirected_to billboard_chart_entry_path(assigns(:billboard_chart_entry))
  end

  test "should show billboard_chart_entry" do
    get :show, id: @billboard_chart_entry
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @billboard_chart_entry
    assert_response :success
  end

  test "should update billboard_chart_entry" do
    patch :update, id: @billboard_chart_entry, billboard_chart_entry: { belongs_to: @billboard_chart_entry.belongs_to, belongs_to: @billboard_chart_entry.belongs_to, belongs_to: @billboard_chart_entry.belongs_to, date: @billboard_chart_entry.date, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, integer: @billboard_chart_entry.integer, peak_position: @billboard_chart_entry.peak_position }
    assert_redirected_to billboard_chart_entry_path(assigns(:billboard_chart_entry))
  end

  test "should destroy billboard_chart_entry" do
    assert_difference('BillboardChartEntry.count', -1) do
      delete :destroy, id: @billboard_chart_entry
    end

    assert_redirected_to billboard_chart_entries_path
  end
end
