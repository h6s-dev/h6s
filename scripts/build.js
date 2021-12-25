const path = require('path')
const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp')
const { build } = require('esbuild')

const config = {
  entryPoints: ['src/index.ts'],
  inject: [path.resolve(__dirname, 'React.js')],
  loader: {
    '.ts': 'ts',
  },
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [pnpPlugin()],
}

Promise.all([
  build({
    ...config,
    format: 'esm',
    outdir: 'dist',
  }),
  build({
    ...config,
    format: 'cjs',
    outdir: 'cjs',
  }),
]).catch(() => process.exit(1))
