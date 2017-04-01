
describe("Visualization - Stacked Grouped Bar Chart", function() {
  var visualization;

  beforeEach(function(done) {

    d3.json('/test/fixtures/json/stacked_grouped_data.json', function(error, data) {
      if (error) throw error;

      visualization = new StackedGroupedBarChart({
        selector: 'body',
        width: 960,
        height: 500,
        data: data,
        groupBy: 'label_field',
        valueFieldsLabels: {
          value_field_1: "Value Field 1",
          value_field_2: "Value Field 2",
          value_field_3: "Value Field 3",
        }
      });
      visualization.draw();
      done();
    });
  });

  it("should create svg with rectangles", function(done) {
    expect(d3.select('body').select('svg').selectAll('rect').size()).toEqual(9);
    done();
  });

  it("should transition grouped to stacked", function(done) {
    setTimeout(function() {
      visualization.transitionGrouped();
      setTimeout(function() {
        visualization.transitionStacked();
      }, 1000);
    }, 1000);
    done();
  });

});

describe("Visualization - Bar Chart", function() {
  var visualization;

  beforeEach(function(done) {

    d3.json('/test/fixtures/json/asteroids.json', function(error, data) {
      if (error) throw error;

      visualization = new BarChart({
        selector: 'body',
        data: data,
        labelField: 'condition_code',
        valueField: 'count'
      });
      visualization.draw();

      done();
    });
  });

  it("should create svg with rectangles", function(done) {
    expect(d3.select('body').select('svg').selectAll('rect').size()).toEqual(7);
    done();
  });

});

describe("Visualization - Pie Chart", function() {
  var visualization;

  beforeEach(function(done) {

    d3.json('/test/fixtures/json/asteroids.json', function(error, data) {
      if (error) throw error;

      visualization = new PieChart({
        selector: 'body',
        data: data,
        labelField: 'condition_code',
        valueField: 'count'
      });
      visualization.draw();

      done();
    });
  });

  it("should create svg with arcs", function(done) {
    expect(d3.select('body').select('svg').selectAll('g.arc').size()).toEqual(7);
    done();
  });

});

describe("Visualization - Scatter Plot", function() {
  var visualization;

  beforeEach(function(done) {

    d3.json('/test/fixtures/json/scatter_plot_data.json', function(error, data) {
      if (error) throw error;

      visualization = new ScatterPlot({
        selector: 'body',
        radiusMin: 4,
        radiusMax: 50,
        data: data,
        labelField: 'condition_code',
        valueField: 'count'
      });
      visualization.draw();

      done();
    });
  });

  it("should create svg with circles", function(done) {
    expect(d3.select('body').select('svg').selectAll('circle').size()).toEqual(1000);
    done();
  });

});
