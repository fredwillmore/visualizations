class ScatterPlot {

  constructor(options) {
    if (typeof options == 'undefined') {
      options = {};
    }

    this.options = Object.assign({
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

    this.data = options.data;

    this.margin = { left: 60, top: 5, right: 5, bottom: 60 };

    this.xAxisLabelText = "Perihelion (AU)";
    this.xAxisLabelOffset = 40;

    this.yAxisLabelText = "Aphelion (AU)";
    this.yAxisLabelOffset = 40;

    this.outerWidth = this.options.outerWidth;
    this.outerHeight = this.options.outerHeight;
    this.innerWidth  = this.outerWidth  - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top  - this.margin.bottom;
  }

  draw() {
    var svg = d3.select(this.options.selector).append("svg")
      .attr("width", this.outerWidth)
      .attr("height", this.outerHeight);

    this.xScale = getScale(this.options.xScale).range([0, this.innerWidth]);
    this.yScale = getScale(this.options.yScale).range([this.innerHeight, 0]);
    this.rScale = getScale(this.options.rScale).range([this.options.radiusMin, this.options.radiusMax]);
    this.colorScale = d3.scaleOrdinal(eval('d3.'+this.options.colorScheme));

    var g = svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // format the data
    var xColumn = this.options.xColumn,
        yColumn = this.options.yColumn,
        rColumn = this.options.rColumn,
        colorColumn = this.options.colorColumn,
        xScale = this.xScale,
        yScale = this.yScale,
        rScale = this.rScale,
        colorScale = this.colorScale;
    this.data.forEach(function(d) {
      d[xColumn] = +d[xColumn];
      d[yColumn] = +d[yColumn];
      d[rColumn] = +d[rColumn];
    });

    this.xScale.domain(d3.extent(this.data, function (d){ return d[xColumn]; }));
    this.yScale.domain(d3.extent(this.data, function (d){ return d[yColumn]; }));
    this.rScale.domain(d3.extent(this.data, function (d){ return d[rColumn]; }));

    var xAxisG = g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.innerHeight + ")");
    var xAxisLabel = g.append("text")
      .style("text-anchor", "middle")
      .attr("x", this.innerWidth / 2)
      .attr("y", this.innerHeight + this.xAxisLabelOffset)
      .attr("class", "label")
      .text(this.xAxisLabelText);
    var yAxisG = g.append("g")
      .attr("class", "y axis");
    var yAxisLabel = g.append("text")
      .style("text-anchor", "middle")
      .attr("transform", "translate(-" + this.yAxisLabelOffset + "," + (this.innerHeight / 2) + ") rotate(-90)")
      .attr("class", "label")
      .text(this.yAxisLabelText);

    this.xAxis = d3.axisBottom(this.xScale)
      .ticks(10, ",.01f");
    this.yAxis = d3.axisLeft(this.yScale)
      .ticks(10, ",.0f");

    xAxisG.call(this.xAxis);
    yAxisG.call(this.yAxis);

    // ENTER
    var grads = svg.append("defs").selectAll("radialGradient")
      .data(this.data)
      .enter()
      .append("radialGradient")
      .attr("cx", "30%")
      .attr("cy", "40%")
      .attr("spreadMethod", "pad")
      .attr("id", function(d, i) { return "grad" + i; });

    var circles = g.selectAll("circle")
      .data(this.data);
    circles.enter().append("circle")
      .attr("cx",   function (d){ return xScale(d[xColumn]); })
      .attr("cy",   function (d){ return yScale(d[yColumn]); })
      .attr("r",    function (d){ return rScale(d[rColumn]); })
      .attr("fill", function(d, i) { return 'url(#grad'+i+')'; });

    // UPDATE
    grads.append("stop")
      .attr("offset", "0%")
      .style("stop-color", function(d) { return d3.rgb(colorScale(d[colorColumn])).brighter(.7); });

    grads.append("stop")
      .attr("offset", "100%")
      .attr("offset", "100%")
      .style("stop-color",  function(d) { return colorScale(d[colorColumn]); });

    // EXIT
    grads.exit().remove();
    circles.exit().remove();

  }

}
