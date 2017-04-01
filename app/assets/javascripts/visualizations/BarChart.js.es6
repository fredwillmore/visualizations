class BarChart {

  constructor(options = {}) {

    // set default parameters
    this.options = Object.assign({
      selector: 'body',
      data: [],
      labelField: 'label',
      valueField: 'count',
      top: 20,
      right: 20,
      bottom: 30,
      left: 80,
      width: 960,
      height: 500,
      yScale: 'linear'
    }, options);

    // set the dimensions and margins of the graph
    this.margin = {top: this.options.top, right: this.options.right, bottom: this.options.bottom, left: this.options.left},
        this.innerWidth = this.options.width - this.margin.left - this.margin.right,
        this.innerHeight = this.options.height - this.margin.top - this.margin.bottom;

    // label and value fields
    this.labelField = options.labelField;
    this.valueField = options.valueField;

    // handle data
    this.data = options.data;
    this.formatData();

    this.setRanges();
  }

  setRanges(){
    this.xScale = d3.scaleBand()
              .range([0, this.innerWidth])
              .padding(0.1);
    this.yScale = getScale(this.options.yScale).range([this.innerHeight, 0]);
  }

  formatData(){
    var valueField = this.valueField;
    this.data.forEach(function(d) {
      d[valueField] = +d[valueField];
      if(isNaN(d[valueField])){
        d[valueField] = 0;
      }
    });
  }

  draw() {
    var xScale = this.xScale,
      yScale = this.yScale,
      innerHeight = this.innerHeight,
      labelField = this.labelField,
      valueField = this.valueField;

    // Scale the range of the data in the domains
    xScale.domain(this.data.map(function(d) { return d[labelField]; }));
    yScale.domain([1, d3.max(this.data, function(d) { return d[valueField]; })]);

    // append the rectangles for the bar chart
    var svg = d3.select(this.options.selector).append("svg")
        .attr("width", this.innerWidth + this.margin.left + this.margin.right)
        .attr("height", this.innerHeight + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + this.margin.left + "," + this.margin.top + ")");

    svg.selectAll(".bar")
        .data(this.data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d[labelField]); })
        .attr("width", xScale.bandwidth())
        .attr("y", function(d) { return yScale(d[valueField]); })
        .attr("height", function(d) { return innerHeight - yScale(d[valueField]); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(xScale));

    // add the y Axis
    switch(yScale){
      case 'log':
        svg.append("g").call(d3.axisLeft(yScale).ticks(10, ",.0f"));
        break;
      case 'linear':
      default:
        svg.append("g").call(d3.axisLeft(yScale));
        break;
    }

  }
}
