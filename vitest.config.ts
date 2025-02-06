import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    name: 'unit',
    globals: true,
    environment: 'node',
    include: ['**/tests/unit/**/*.test.ts', '**/components/**/*.test.ts', '**/composables/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['**/components/**/*.vue', '**/composables/**/*.ts'],
    },
  },
})
