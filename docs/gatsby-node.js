exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@emotion/babel-plugin',
    options: {
      sourceMap: true,
    },
  })
}
