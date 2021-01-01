import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: 'src/index.ts',

  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs(),
    babel({
      babelrc: true,
      extensions,
      babelHelpers: 'runtime',
      plugins: ['@babel/transform-runtime'],
    }),
    terser(),
    sourceMaps(),
  ],
}
