class PieChart {

  constructor(options) {
    if (typeof options == 'undefined') {
      options = {};
    }

    this.options = Object.assign({
      selector: 'body',
      top: 20,
      width: 960,
      height: 500,
      colorScheme: 'schemeCategory10',
      labelField: 'label',
      valueField: 'count'
    }, options);

    this.data = this.options.data;
    this.radius = Math.min(this.options.width, this.options.height) / 2;

    this.createScales();
  }

  createScales() {
    this.colorScale = d3.scaleOrdinal(eval('d3.'+this.options.colorScheme));
  }

  draw() {
    var svg = d3.select(this.options.selector).append("svg")
        .attr("width", this.options.width)
        .attr("height", this.options.height),
      g = svg.append("g").attr("transform", "translate(" + this.options.width / 2 + "," + this.options.height / 2 + ")");


    var valueField = this.options.valueField, labelField = this.options.labelField;
    var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d[valueField]; });

    // TODO: configure these radii
    var path = d3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);

    var label = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    // format the data
    this.data.forEach(function(d) {
      d[valueField] = +d[valueField];
    });

    var arc = g.selectAll(".arc")
      .data(pie(this.data))
      .enter().append("g")
        .attr("class", "arc");

    var colorScale = this.colorScale;
    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return colorScale(d.data[labelField]); });

    // TODO: configure these text attributes
    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function(d) { return d.data[labelField]; });
  }
}
