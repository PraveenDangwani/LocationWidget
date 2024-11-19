module.exports = {
    testEnvironment: 'jsdom', // Simulates a browser environment
    setupFilesAfterEnv: ['@testing-library/jest-dom'], // Provides additional matchers for testing
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS/SCSS files
      '\\.(png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image imports
    },
  };
  