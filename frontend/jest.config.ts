export default {
  clearMocks: true,

  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },

  moduleNameMapper: {
    '^/@/(.*)$': '<rootDir>/src/$1',
  },
  coverageDirectory: 'coverage',

  coverageProvider: 'v8',
}
