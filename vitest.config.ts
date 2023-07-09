import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    passWithNoTests: true,
    include: ['src/__tests__/**/*.spec.{ts,js}'],
    coverage: {
      // @vitest/coverage-v8
      provider: 'v8',
      reporter: ['text'],
      reportsDirectory: 'coverage',
      include: [
        'src/**/*.{ts,js}',
        // NOTE: indexファイルはexport用なのでcoverage対象から除外
        '!src/**/index.{ts,js}',
        '!src/__tests__/**',
        '!**/node_modules/**',
        '!**/vendor/**',
      ],
    },
  },
});
