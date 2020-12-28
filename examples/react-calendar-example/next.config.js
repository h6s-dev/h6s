const path = require('path')
const resolveFrom = require('resolve-from')

const reactCalendarPackage = path.resolve(__dirname, '../../')

module.exports = {
  webpack(config) {
    config.module.rules.unshift({
      test: /\.tsx?$/,
      include: (filePath) => {
        return filePath.includes('react-calendar/src')
      },
      loader: require.resolve('babel-loader'),
      options: {
        babelrc: false,
        configFile: false,
        compact: false,
        presets: [
          require.resolve('@babel/preset-env'),
          require.resolve('@babel/preset-typescript'),
          require.resolve('@babel/preset-react'),
          require.resolve('@emotion/babel-preset-css-prop'),
        ],
        plugins: [
          require.resolve('@babel/plugin-proposal-optional-chaining'),
          require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
          require.resolve('@babel/plugin-proposal-numeric-separator'),
          require.resolve('@babel/plugin-proposal-class-properties'),
        ],
        cacheDirectory: true,
      },
    })

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        react$: resolveFrom(
          path.resolve(reactCalendarPackage, 'node_modules'),
          'react',
        ),
        'react-dom$': resolveFrom(
          path.resolve(reactCalendarPackage, 'node_modules'),
          'react-dom',
        ),
      },
    }

    return config
  },
}
