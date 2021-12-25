const withTM = require("next-transpile-modules")(["@h6s/calendar"]);

module.exports = withTM({
  reactStrictMode: true,
});
