// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function barChart(options={}){
  // set default parameters
  options = Object.assign({
    selector: 'body',
    top: 20,
    right: 20,
    bottom: 30,
    left: 80,
    width: 960,
    height: 500,
    yScale: 'linear'
  }, options);

  // set the dimensions and margins of the graph
  var margin = {top: options.top, right: options.right, bottom: options.bottom, left: options.left},
      width = options.width - margin.left - margin.right,
      height = options.height - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = getScale(options.yScale).range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(options.selector).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // get the data
  d3.json("/visualizations/asteroid_bar_chart.json", function(error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function(d) {
      d.count = +d.count;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.condition_code; }));
    y.domain([1, d3.max(data, function(d) { return d.count; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.condition_code); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    switch(options.yScale){
      case 'log':
        svg.append("g").call(d3.axisLeft(y).ticks(10, ",.0f"));
        break;
      case 'linear':
      default:
        svg.append("g").call(d3.axisLeft(y));
        break;
    }

  });
}

function pieChart(options = {}) {

  options = Object.assign({
    selector: 'body',
    top: 20,
    width: 960,
    height: 500,
    colorScheme: 'schemeCategory10',
    dataFile: '/visualizations/asteroid_pie_chart.json',
    labelField: 'age',
    valueField: 'population'
  }, options);

  var svg = d3.select(options.selector).append("svg")
      .attr("width", options.width)
      .attr("height", options.height),
    radius = Math.min(options.width, options.height) / 2,
    g = svg.append("g").attr("transform", "translate(" + options.width / 2 + "," + options.height / 2 + ")");

  var color = d3.scaleOrdinal(eval('d3.'+options.colorScheme));

  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d[options.valueField]; });

  // TODO: configure these radii
  var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  d3.json(options.dataFile, function(error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function(d) {
      d[options.valueField] = +d[options.valueField];
    });

    if (error) throw error;

    var arc = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data[options.labelField]); });

    // TODO: configure these text attributes
    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function(d) { return d.data[options.labelField]; });
  });
}

function scatterPlot(options = {}){

  options = Object.assign({
    selector: 'body',
    outerWidth: 900,
    outerHeight: 500,
    radiusMin: 1,
    radiusMax: 6,
    xColumn: "perihelion",
    yColumn: "aphelion",
    rColumn: "diameter",
    colorColumn: "condition_code",
    colorScheme: 'schemeCategory10',
    xScale: 'log',
    yScale: 'log',
    rScale: 'linear',
  }, options);

  var margin = { left: 60, top: 5, right: 5, bottom: 60 };

  var xAxisLabelText = "Perihelion (AU)";
  var xAxisLabelOffset = 40;

  var yAxisLabelText = "Aphelion (AU)";
  var yAxisLabelOffset = 40;

  var innerWidth  = options.outerWidth  - margin.left - margin.right;
  var innerHeight = options.outerHeight - margin.top  - margin.bottom;

  var svg = d3.select(options.selector).append("svg")
    .attr("width", options.outerWidth)
    .attr("height", options.outerHeight);

  var xScale = getScale(options.xScale).range([0, innerWidth]);
  var yScale = getScale(options.yScale).range([innerHeight, 0]);
  var rScale = getScale(options.rScale).range([options.radiusMin, options.radiusMax]);
  var colorScale = d3.scaleOrdinal(eval('d3.'+options.colorScheme));

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  function render(data){

    // format the data
    data.forEach(function(d) {
      d.perihelion = +d.perihelion;
      d.aphelion = +d.aphelion;
      d.mass = +d.mass;
      d.diameter = +d.diameter;
    });

    xScale.domain(d3.extent(data, function (d){ return d[options.xColumn]; }));
    yScale.domain(d3.extent(data, function (d){ return d[options.yColumn]; }));
    rScale.domain(d3.extent(data, function (d){ return d[options.rColumn]; }));

    var xAxisG = g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + innerHeight + ")");
    var xAxisLabel = g.append("text")
      .style("text-anchor", "middle")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + xAxisLabelOffset)
      .attr("class", "label")
      .text(xAxisLabelText);
    var yAxisG = g.append("g")
      .attr("class", "y axis");
    var yAxisLabel = g.append("text")
      .style("text-anchor", "middle")
      .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
      .attr("class", "label")
      .text(yAxisLabelText);

    var xAxis = d3.axisBottom(xScale)
      .ticks(10, ",.01f");
    var yAxis = d3.axisLeft(yScale)
      .ticks(10, ",.0f");

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    // ENTER
    var grads = svg.append("defs").selectAll("radialGradient")
      .data(data)
      .enter()
      .append("radialGradient")
      .attr("cx", "30%")
      .attr("cy", "40%")
      .attr("spreadMethod", "pad")
      .attr("id", function(d, i) { return "grad" + i; });

    var circles = g.selectAll("circle").data(data);
    circles.enter().append("circle")
      .attr("cx",   function (d){ return xScale(d[options.xColumn]); })
      .attr("cy",   function (d){ return yScale(d[options.yColumn]); })
      .attr("r",    function (d){ return rScale(d[options.rColumn]); })
      .attr("fill", function(d, i) { return 'url(#grad'+i+')'; });

    // UPDATE
    grads.append("stop")
      .attr("offset", "0%")
      .style("stop-color", function(d) { return d3.rgb(colorScale(d[options.colorColumn])).brighter(.7); });

    grads.append("stop")
      .attr("offset", "100%")
      .attr("offset", "100%")
      .style("stop-color",  function(d) { return colorScale(d[options.colorColumn]); });

    // EXIT
    grads.exit().remove();
    circles.exit().remove();

  }

  d3.json("/visualizations/asteroid_scatter_plot.json", render);
}

// HELPER FUNCTIONS

function getScale(scaleName){
  switch(scaleName){
    case 'log':
    case 'scaleLog':
      return d3.scaleLog();
    case 'band':
    case 'scaleBand':
      return d3.scaleBand();
    case 'linear':
    case 'scaleLinear':
    default:
      return d3.scaleLinear();
  }
}
