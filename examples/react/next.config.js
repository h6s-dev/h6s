const withTM = require('next-transpile-modules')(['@h6s/calendar', '@h6s/table'])

module.exports = withTM({
  reactStrictMode: true,
})
