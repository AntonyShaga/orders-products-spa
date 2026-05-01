// eslint-disable-next-line import/no-anonymous-default-export
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  rootDir: '.',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
}
