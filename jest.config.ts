import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const esModules = ['otpauth'];
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    `/node_modules/(?!(${esModules.join('|')})/)`,
  ],
};

// See https://github.com/vercel/next.js/issues/40183#issuecomment-1249077718
export default async () => {
  const jestConfig = await createJestConfig(config)();
  return {
    ...jestConfig,
    transformIgnorePatterns: jestConfig.transformIgnorePatterns.filter(
      (ptn: string) => ptn !== '/node_modules/',
    ),
  };
};
