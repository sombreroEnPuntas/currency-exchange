module.exports = {
  collectCoverageFrom: [
    'pages/**/*.{js,jsx,ts,tsx}',
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    // glue code should be ignored:
    '!pages/_app.tsx',
    '!pages/_document.tsx',
    '!pages/api/rates.ts',
    // trivial auto-focus implementation:
    '!src/utils/useAutoFocus.ts',
    // trivial polling implementation:
    '!src/components/ExchangeForm/useRates.ts',
    // trivial pagination implementation:
    '!src/utils/usePages.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {},
}
