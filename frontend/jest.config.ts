export default {
  clearMocks: true,

  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  coverageDirectory: 'coverage',

  coverageProvider: 'v8',
}
