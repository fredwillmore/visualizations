class BarChart {

  constructor(options = {}) {

    // set default parameters
    var o = this.options = Object.assign({
      selector: 'body',
      data: [],
      labelField: 'label',
      valueField: 'count',
      margin: {top: 20, right: 20, bottom: 60, left: 80},
      width: 960,
      height: 500,
      yScale: 'linear'
    }, options);

    // set the dimensions and margins of the graph
    this.margin = o.margin;
    this.innerWidth = o.width - this.margin.left - this.margin.right;
    this.innerHeight = o.height - this.margin.top - this.margin.bottom;

    // label and value fields
    this.labelField = o.labelField;
    this.valueField = o.valueField;

    // handle data
    this.data = o.data;
    this.formatData();

    this.createScales();
  }

  createScales(){
    this.xScale = d3.scaleBand()
      .range([0, this.innerWidth])
      .padding(0.1);
    this.yScale = getScale(this.options.yScale).range([this.innerHeight, 0]);
    this.colorScale = getScale('color');
    this.brightnessScale = getScale('linear').domain([0,5]).range([0,1]);
  }

  formatData(){
    this.data.forEach((d) => {
      d[this.valueField] = +d[this.valueField];
      if(isNaN(d[this.valueField])){
        d[this.valueField] = 0;
      }
    });
  }

  draw() {

    // Scale the range of the data in the domains
    this.xScale.domain(this.data.map((d) => d[this.labelField]));
    this.yScale.domain([1, d3.max(this.data, (d) => d[this.valueField])]);
    this.colorScale.domain(0, this.data.length);

    // append the rectangles for the bar chart
    var svg = d3.select(this.options.selector).append("svg")
        .attr("width", this.innerWidth + this.margin.left + this.margin.right)
        .attr("height", this.innerHeight + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform",
              `translate(${this.margin.left},${this.margin.top})`);

    svg.selectAll(".bar")
        .data(this.data)
      .enter().append("rect")
        .attr("fill", (d, i) => d3.rgb(this.colorScale(0)).brighter(this.brightnessScale(i)))
        .attr("x", (d) => this.xScale(d[this.labelField]))
        .attr("width", this.xScale.bandwidth())
        .attr("y", (d) => this.yScale(d[this.valueField]))
        .attr("height", (d) => this.innerHeight - this.yScale(d[this.valueField]));

    var grads = svg.append("defs").selectAll("linearGradient")
      .data(this.data)
      .enter()
      .append("linearGradient")
      .attr("id", (d, i) => "grad"+i);

    this.addAxes(svg);

  }

  addAxes(svg) {
    // add the x Axis
    svg.append("g")
        .attr("transform", `translate(0, ${this.innerHeight})`)
        .attr("width", "90")
        .call(d3.axisBottom(this.xScale))
        .selectAll(".tick text")
        .call(wrap, this.xScale.bandwidth());

    // add the y Axis
    switch(this.options.yScale){
      case 'log':
        svg.append("g").call(d3.axisLeft(this.yScale).ticks(10, ",.0f"));
        break;
      case 'linear':
      default:
        svg.append("g").call(d3.axisLeft(this.yScale));
        break;
    }
  }

}
