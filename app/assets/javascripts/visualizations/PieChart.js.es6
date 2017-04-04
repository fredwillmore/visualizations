class PieChart {

  constructor(options) {
    if (typeof options == 'undefined') {
      options = {};
    }

    var o = this.options = Object.assign({
      selector: 'body',
      top: 20,
      width: 960,
      height: 500,
      colorScheme: 'schemeCategory10',
      labelField: 'label',
      valueField: 'count'
    }, options);

    this.data = o.data;
    this.radius = Math.min(o.width, o.height) / 2;
    this.valueField = o.valueField;
    this.labelField = o.labelField;
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

    var pie = d3.pie()
      .sort(null)
      .value((d) => d[this.valueField]);

    // TODO: configure these radii
    var path = d3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);

    var label = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    // format the data
    this.data.forEach((d) => {
      d[this.valueField] = +d[this.valueField];
    });

    var arc = g.selectAll(".arc")
      .data(pie(this.data))
      .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", (d) => this.colorScale(d.data[this.labelField]));

    // TODO: configure these text attributes
    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text((d) => d.data[this.labelField]);
  }
}
