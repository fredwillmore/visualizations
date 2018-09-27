const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

module.exports = environment

environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    d3: 'd3',
    React: 'react',
    PropTypes: "prop-types",
    ReactTransitionGroup: 'react-transition-group'
  })
)