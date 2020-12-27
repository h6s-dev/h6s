import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: 'src/index.ts',

  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      babelrc: true,
      extensions,
      babelHelpers: 'runtime',
      plugins: ['@babel/transform-runtime'],
    }),
    sourceMaps(),
  ],
}
