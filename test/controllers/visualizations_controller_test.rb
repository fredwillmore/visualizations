require 'test_helper'

class VisualizationsControllerTest < ActionController::TestCase

  setup do
    FactoryGirl.create :asteroid,
      condition_code: 5,
      q: 1.23,
      ad: 4.56,
      gm: 1000,
      diameter: 1
  end

  test "should get asteroids by condition_code" do
    get :asteroid_bar_chart, format: :json
    assert_response :success
    asteroids = JSON.parse(@response.body)
    assert_equal asteroids.find { |v| v['condition_code']==5 }['count'], 1
  end

  test "should get asteroid_scatter_plot" do
    get :asteroid_scatter_plot, format: :json
    assert_response :success
    asteroids = JSON.parse(@response.body)
    assert asteroids.find { |v| v['perihelion']=='1.23' }['aphelion'], '4.56'
  end

end
