// HELPER FUNCTIONS
  import * as d3 from 'd3'

export default class VisualizationsHelpers {

// function visualizationsHelpers() {
  
  getScale(scaleName){
    switch(scaleName){
      case 'log':
      case 'scaleLog':
        return d3.scaleLog();
      case 'band':
      case 'scaleBand':
        return d3.scaleBand();
      case 'color':
      case 'scaleColor':
        return d3.scaleOrdinal(d3.schemeCategory10);
      case 'time':
      case 'date':
      case 'scaleTime':
        return d3.scaleTime();
      case 'linear':
      case 'scaleLinear':
      default:
        // return d3.scaleLinear();
        return d3.scaleLinear();
    }
  }

  // ugh - just look at this thing - just look at it!
  wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

  zoomed() {
    view.attr("transform", d3.event.transform);
    gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
    gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
  }

  zoom() { 
    d3.zoom().scaleExtent([1, 40]).translateExtent([[-100, -100], [1000 + 90, 500 + 100]]).on("zoom", zoomed);
  }

  toArray(s=null, splitOn=/\s+/) {
    if(Array.isArray(s)){
      return s
    }
    return s ? s.toString().trim(splitOn).split(splitOn) : []
  }

  toUnique(a){
    return this.toArray(a).filter((value, index, self) => self.indexOf(value) === index)
  }

  inArray(a, e) {
    return this.toArray(a).indexOf(e) >= 0
  }

  toString(a){
    return this.toArray(a).join(' ')
  }

  addToList(list, str){
    return this.toString(this.toUnique(this.toArray(list).concat(this.toArray(str))))
  }

  removeFromList(list, e){
    return this.toString(removeFromArray(this.toArray(list), e))
  }

  removeFromArray(a, e){
    return a.filter((c) => !this.inArray(this.toArray(e), c))
  }

}
