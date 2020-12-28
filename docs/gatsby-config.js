module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        typescript: true,
        title: 'React Calendar Docs',
        description: 'Headless Calendar UI Library',

        menu: [
          'React Calendar',
          'Installation',
          'Getting Started',
          'API Reference',
        ],
      },
    },
  ],
}
