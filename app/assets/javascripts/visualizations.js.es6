// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// HELPER FUNCTIONS

function getScale(scaleName){
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
      return d3.scaleLinear();
  }
}

// ugh - just look at this thing - just look at it!
function wrap(text, width) {
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

function zoomed() {
  view.attr("transform", d3.event.transform);
  gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
  gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
}

var zoom = d3.zoom().scaleExtent([1, 40]).translateExtent([[-100, -100], [1000 + 90, 500 + 100]]).on("zoom", zoomed);
