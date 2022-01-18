const path = require('path')
const fs = require('fs')
const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp')
const { build } = require('esbuild')

const ROOT = path.resolve(__dirname, '..')
const packageJSON = JSON.parse(fs.readFileSync(path.resolve(ROOT, process.cwd(), 'package.json'), 'utf8'))

const config = {
  entryPoints: ['src/index.ts'],
  loader: {
    '.ts': 'ts',
  },
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [pnpPlugin()],
  external: [
    ...Object.keys(packageJSON.dependencies ?? {}),
    ...Object.keys(packageJSON.peerDependencies ?? {}),
    ...Object.keys(packageJSON.peerDependenciesMeta ?? {}),
  ],
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
