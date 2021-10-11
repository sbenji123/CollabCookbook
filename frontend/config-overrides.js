const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': '/components',
    '@assets' : '/assets'
  })(config)

  return config
}