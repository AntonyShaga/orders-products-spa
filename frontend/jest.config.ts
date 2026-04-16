// eslint-disable-next-line import/no-anonymous-default-export
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  rootDir: '.',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
}
