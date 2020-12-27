module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'src/index.ts'],
  collectCoverageFrom: ['src/*.{js,ts}'],
}
