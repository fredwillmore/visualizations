class ScatterPlot {

  constructor(options) {
    if (typeof options == 'undefined') {
      options = {};
    }

    var o = this.options = Object.assign({
      selector: 'body',
      outerWidth: 900,
      outerHeight: 500,
      radiusMin: 1,
      radiusMax: 6,
      xColumn: "perihelion",
      yColumn: "aphelion",
      rColumn: "diameter",
      xAxisLabelText: "Perihelion (AU)",
      yAxisLabelText: "Aphelion (AU)",
      xAxisLabelOffset: 40,
      yAxisLabelOffset: 40,
      margin: { left: 60, top: 5, right: 5, bottom: 60 },
      colorColumn: "condition_code",
      colorScheme: 'schemeCategory10',
      xScale: 'log',
      yScale: 'log',
      rScale: 'linear',
    }, options);

    this.xColumn = o.xColumn;
    this.yColumn = o.yColumn;
    this.rColumn = o.rColumn;
    this.colorColumn = o.colorColumn;

    this.xAxisLabelText = o.xAxisLabelText;
    this.xAxisLabelOffset = o.xAxisLabelOffset;
    this.yAxisLabelText = o.yAxisLabelText;
    this.yAxisLabelOffset = o.yAxisLabelOffset;

    this.margin = o.margin;
    this.outerWidth = o.outerWidth;
    this.outerHeight = o.outerHeight;
    this.innerWidth  = this.outerWidth  - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top  - this.margin.bottom;

    this.data = o.data;
    this.formatData();
    this.createScales();

    this.selector = o.selector;
  }

  formatData() {
    this.data.forEach((d) => {
      d[this.xColumn] = +d[this.xColumn];
      d[this.yColumn] = +d[this.yColumn];
      d[this.rColumn] = +d[this.rColumn];
    });
  }

  createScales() {
    this.xScale = getScale(this.options.xScale).range([0, this.innerWidth]);
    this.yScale = getScale(this.options.yScale).range([this.innerHeight, 0]);
    this.rScale = getScale(this.options.rScale).range([this.options.radiusMin, this.options.radiusMax]);
    this.colorScale = d3.scaleOrdinal(eval('d3.'+this.options.colorScheme));

    this.xScale.domain(d3.extent(this.data, (d) => d[this.xColumn]));
    this.yScale.domain(d3.extent(this.data, (d) => d[this.yColumn]));
    this.rScale.domain(d3.extent(this.data, (d) => d[this.rColumn]));

    this.yScale.domain(d3.extent(this.data, (d) => d[this.yColumn]));
    this.rScale.domain(d3.extent(this.data, (d) => d[this.rColumn]));
  }

  draw() {
    var svg = d3.select(this.selector).append("svg")
      .attr("width", this.outerWidth)
      .attr("height", this.outerHeight);

    var g = svg.append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    this.addAxes(g);

    // ENTER
    var grads = svg.append("defs").selectAll("radialGradient")
      .data(this.data)
      .enter()
      .append("radialGradient")
      .attr("cx", "30%")
      .attr("cy", "40%")
      .attr("spreadMethod", "pad")
      .attr("id", (d, i) => "grad"+i);

    var circles = g.selectAll("circle")
      .data(this.data);

    // UPDATE
    grads.append("stop")
      .attr("offset", "0%")
      .style("stop-color", (d) => d3.rgb(this.colorScale(d[this.colorColumn])).brighter(.7));

    grads.append("stop")
      .attr("offset", "100%")
      .style("stop-color", (d) => this.colorScale(d[this.colorColumn]));

    circles.enter().append("circle")
      .attr("cx", (d) => this.xScale(d[this.xColumn]))
      .attr("cy", (d) => this.yScale(d[this.yColumn]))
      .attr("r", (d) => this.rScale(d[this.rColumn]))
      .attr("fill", (d, i) => `url(#grad${i})`);

    // EXIT
    grads.exit().remove();
    circles.exit().remove();
  }

  addAxes(g) {
    var xAxisG = g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${this.innerHeight})`);
    g.append("text")
      .style("text-anchor", "middle")
      .attr("x", this.innerWidth / 2)
      .attr("y", this.innerHeight + this.xAxisLabelOffset)
      .attr("class", "label")
      .text(this.xAxisLabelText);
    var yAxisG = g.append("g")
      .attr("class", "y axis");
    g.append("text")
      .style("text-anchor", "middle")
      .attr("transform", `translate(-${this.yAxisLabelOffset},${(this.innerHeight / 2)}) rotate(-90)`)
      .attr("class", "label")
      .text(this.yAxisLabelText);

    var xAxis = d3.axisBottom(this.xScale)
      .ticks(10, ",.01f");
    var yAxis = d3.axisLeft(this.yScale)
      .ticks(10, ",.0f");

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
  }

}
