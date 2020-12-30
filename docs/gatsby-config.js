const config = require('./config')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        typescript: true,
        title: config.title,
        description: config.description,

        menu: [
          'React Calendar',
          'Installation',
          'Core Concept',
          'Getting Started',
          'API Reference',
          'Examples',
        ],
      },
    },
  ],
}
