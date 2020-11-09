module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@yougov/(.*)": "<rootDir>/src/$1"
  },
};