import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'batchRunner',
      formats: ['umd', 'cjs', 'es'],
      fileName: (format) => {
        if (format === 'umd') return 'batch-runner.umd.js'
        if (format === 'cjs') return 'batch-runner.cjs'
        return 'batch-runner.esm.mjs'
      }
    },
    minify: 'esbuild'
  }
})
