const config = require('./config')

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-theme-docz',
      options: {
        typescript: true,
        editBranch: 'main',

        title: config.title,
        description: config.description,

        menu: [
          'React Calendar',
          {
            name: 'Getting Started',
            menu: ['Overview', 'Installation', 'Quick Start'],
          },
          { name: 'API References', menu: ['useCalendar'] },
          { name: 'Examples', menu: ['Basic'] },
        ],
      },
    },
  ],
}
