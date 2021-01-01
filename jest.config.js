module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'src/index.ts', 'src/models/*', 'src/core/index.ts', 'src/plugins/index.ts', 'src/utils.index.ts'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
}
