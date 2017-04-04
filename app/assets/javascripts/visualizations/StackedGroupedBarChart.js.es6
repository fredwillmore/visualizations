class StackedGroupedBarChart {

  constructor(options) {
    var o = this.options = Object.assign({
      selector: 'body',
      valueFieldsLabels: {},
      margin: {top: 40, right: 10, bottom: 20, left: 10}
    }, options);

    this.valueFieldsLabels = o.valueFieldsLabels;
    this.valueFields = Object.keys(this.valueFieldsLabels);
    this.groupBy = o.groupBy;
    this.data = o.data;
    this.formatData();
    this.createMetadataLookup();
    this.margin = o.margin;
    this.selector = o.selector;
    this.width = o.width;
    this.height = o.height;
  }

  formatData() {
    this.data.forEach((d) => {
      this.valueFields.forEach((field) => {
        d[field] = d[field]+d[field];
        if(isNaN(d[field])){
          d[field]=0;
        };
      });
    });
  }

  // NOTE: we need to look up metadata associated with the rects on the graph
  // I'd prefer to just attach data to the rect when it's created
  // I couldn't figure out how to put a more complex object in yz without the
  // information getting lost in the transformation to y01z
  // so, I'm creating this big dumb lookup to get labels given array position
  createMetadataLookup() {
    this.metadataLookup = {
      [this.groupBy]: this.data.map((d) => d[this.groupBy]),
      label: Object.keys(this.valueFieldsLabels).map((v, k) => this.valueFieldsLabels[v])
    };
  }

  // TODO: this is doing a lot more than just creating scales
  createScales() {
    this.innerWidth = this.width - this.margin.left - this.margin.right,
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;

    this.m = this.data.length, // The number of values per series.
    this.n = this.valueFields.length; // The number of series.

    // The xz array has m elements, representing the x-values shared by all series.
    // The yz array has n elements, representing the y-values of each of the n series.
    // Each yz[i] is an array of m non-negative numbers representing a y-value for xz[i].
    // The y01z array has the same structure as yz, but with stacked [y₀, y₁] instead of y.
    var xz = d3.range(this.m);
    var yz = this.valueFields.map((field) => this.data.map((row, row_index) => row[field]));
    this.y01z = d3.stack().keys(d3.range(this.n))(d3.transpose(yz));
    this.yMax = d3.max(yz, (y) => d3.max(y));
    this.y1Max = d3.max(this.y01z, (y) => d3.max(y, (d) => d[1]));

    this.xScale = d3.scaleBand()
      .domain(xz)
      .rangeRound([0, this.innerWidth])
      .padding(0.08);

    this.yScale = d3.scaleLinear()
      .domain([0, this.y1Max])
      .range([this.innerHeight, 0]);

    this.colorScale = d3.scaleOrdinal()
      .domain(d3.range(this.n))
      .range(d3.schemeCategory20c);
  }

  draw() {
    this.createScales();

    var svg = d3.select(this.selector).append("svg")
        .attr("width", this.width)
        .attr("height", this.height),
      g = svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    var series = g.selectAll(".series")
      .data(this.y01z)
      .enter().append("g")
        .attr("fill", (d, i) => this.colorScale(i));

    this.rect = series.selectAll("rect")
      .data((d) => d) // TODO: figure out why or if I need this
      .enter().append("rect")
      .attr("x", (d, i) => this.xScale(i))
      .attr("y", this.innerHeight)
      .attr("width", this.xScale.bandwidth())
      .attr("height", 0)
      .attr("mydata:label", (d,i) => this.metadataLookup.label[i]);
      // .on('mouseover', tip.show)
      // .on('mouseout', tip.hide);

    this.rect.transition()
      .delay((d, i) => i * 10)
      .attr("y", (d) => this.yScale(d[1]))
      .attr("height", (d) => this.yScale(d[0]) - this.yScale(d[1]));

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.innerHeight + ")")
      .call(d3.axisBottom(this.xScale)
      .tickSize(0)
      .tickFormat((d) => this.metadataLookup[this.groupBy][d])
      .tickPadding(6));
  }

  transitionGrouped() {
    var context = this; // aliasing `this` because I still need to refer to this.parentNode.__data__.key below
    context.yScale.domain([0, context.y1Max]);
    context.rect.transition()
        .duration(500)
        .delay((d, i) => i * 10)
        .attr("x", function(d, i) {
          return context.xScale(i) + context.xScale.bandwidth() / context.n * this.parentNode.__data__.key;
        })
        .attr("width", context.xScale.bandwidth() / context.n)
      .transition()
        .attr("y", (d) => context.yScale(d[1] - d[0]))
        .attr("height", (d) => context.yScale(0) - context.yScale(d[1] - d[0]));
  }

  transitionStacked() {
    this.yScale.domain([0, this.y1Max]);
    this.rect.transition()
        .duration(500)
        .delay((d, i) => i * 10)
        .attr("y", (d) => this.yScale(d[1]))
        .attr("height", (d) => this.yScale(d[0]) - this.yScale(d[1]))
      .transition()
        .attr("x", (d, i) => this.xScale(i))
        .attr("width", this.xScale.bandwidth());
  }
}
