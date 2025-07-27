import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setup.js',
      coverage: {
        checkCoverage: true,
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: [
          'src/**/*.test.{js,jsx,ts,tsx}',
          'src/**/*.spec.{js,jsx,ts,tsx}',
          'src/index.{js,jsx,ts,tsx}',
          'src/setupTests.{js,ts}',
          'src/**/*.d.ts',
          'src/**/mocks/*.{js,jsx,ts,tsx}',
        ],
        thresholds: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  })
);
