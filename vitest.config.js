import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/**/*.test.js'],
    coverage: {
      include: ['src/**/*.js'],
      reporter: ['lcov', 'text-summary'],
      exclude: ['node_modules', 'test', 'test-data']
    }
  }
})
