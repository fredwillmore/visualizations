class StackedGroupedBarChart {

  constructor(options) {
    this.options = Object.assign({
      selector: 'body',
      valueFieldsLabels: {}

    }, options);
    this.valueFields = Object.keys(options.valueFieldsLabels);
    this.data = options.data;
    this.formatData();
    this.createMetadataLookup();
    this.margin = {top: 40, right: 10, bottom: 20, left: 10};
  };

  formatData() {
    var valueFields = this.valueFields; // TODO: do some smarter data binding
    this.data.forEach(function(d) {
      valueFields.forEach(function(field) {
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
    var groupBy = this.options.groupBy, valueFieldsLabels = this.options.valueFieldsLabels;
    this.metadataLookup = { [groupBy]: this.data.map(function(d){ return d[groupBy] }),
    label: Object.keys(valueFieldsLabels)
      .map( function(v, k){
        return valueFieldsLabels[v];
      })};
  }

  // TODO: this is doing a lot more than just creating scales
  createScales() {
    this.innerWidth = this.options.width - this.margin.left - this.margin.right,
    this.innerHeight = this.options.height - this.margin.top - this.margin.bottom;

    this.m = this.data.length, // The number of values per series.
    this.n = this.valueFields.length; // The number of series.

    // The xz array has m elements, representing the x-values shared by all series.
    // The yz array has n elements, representing the y-values of each of the n series.
    // Each yz[i] is an array of m non-negative numbers representing a y-value for xz[i].
    // The y01z array has the same structure as yz, but with stacked [y₀, y₁] instead of y.
    var data = this.data;
    var yz = this.valueFields.map(function(field) {
      return data.map(function(row, row_index){
       return row[field];
     });
    });

    this.y01z = d3.stack().keys(d3.range(this.n))(d3.transpose(yz));
    this.yMax = d3.max(yz, function(y) {
      return d3.max(y);
    });
    this.y1Max = d3.max(this.y01z, function(y) {
      return d3.max(y, function(d) {
        return d[1];
      });
    });

    this.xScale = d3.scaleBand()
      .domain(d3.range(this.data.length))
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

    var svg = d3.select(this.options.selector).append("svg")
        .attr("width", this.options.width)
        .attr("height", this.options.height),
      g = svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    var colorScale = this.colorScale;
    var series = g.selectAll(".series")
      .data(this.y01z)
      .enter().append("g")
        .attr("fill", function(d, i) { return colorScale(i); });

    var metadataLookup = this.metadataLookup;
    var xScale = this.xScale,
      yScale = this.yScale;
    this.rect = series.selectAll("rect")
      .data(function(d) {
        return d;
      })
      .enter().append("rect")
        .attr("x", function(d, i) {
          return xScale(i);
        })
        .attr("y", this.innerHeight)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("mydata:label", function(d,i){
          return metadataLookup.label[i];
        });
        // .on('mouseover', tip.show)
        // .on('mouseout', tip.hide);

    this.rect.transition()
        .delay(function(d, i) {
          return i * 10;
        })
        .attr("y", function(d) {
          return yScale(d[1]);
        })
        .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); });

    var groupBy = this.options.groupBy;

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.innerHeight + ")")
        .call(d3.axisBottom(this.xScale)
            .tickSize(0)
            .tickFormat(function(d) { return metadataLookup[groupBy][d]; })
            .tickPadding(6));

  }

  transitionGrouped() {
    var xScale = this.xScale,
      yScale = this.yScale,
      n = this.n;
    yScale.domain([0, this.y1Max]);
    this.rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("x", function(d, i) {
          return xScale(i) + xScale.bandwidth() / n * this.parentNode.__data__.key;
        })
        .attr("width", xScale.bandwidth() / n)
      .transition()
        .attr("y", function(d) {
          return yScale(d[1] - d[0]);
        })
        .attr("height", function(d) { return yScale(0) - yScale(d[1] - d[0]); });
  }

  transitionStacked() {
    var xScale = this.xScale,
      yScale = this.yScale;
    yScale.domain([0, this.y1Max]);

    this.rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return yScale(d[1]); })
        .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
      .transition()
        .attr("x", function(d, i) { return xScale(i); })
        .attr("width", xScale.bandwidth());
  }
}
