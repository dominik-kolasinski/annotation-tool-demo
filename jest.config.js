module.exports = {
  testMatch: ["<rootDir>/**/*.test.(js|jsx|ts|tsx)"],
  setupFiles: ["<rootDir>/src/setupTests.ts"],
  transformIgnorePatterns: [`<rootDir>/node_modules/`],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  }
};
