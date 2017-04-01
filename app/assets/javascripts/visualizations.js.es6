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
    case 'linear':
    case 'scaleLinear':
    default:
      return d3.scaleLinear();
  }
}
