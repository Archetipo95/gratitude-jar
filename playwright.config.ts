import type { ConfigOptions } from '@nuxt/test-utils/playwright'
import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

export default defineConfig<ConfigOptions>({
  testMatch: '**/tests/e2e/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: 'github',
  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        channel: 'chrome',
        isMobile: false,
      },
      metadata: {
        deviceName: 'desktop-chrome',
      },
    },
    // {
    //   name: 'Safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     browserName: 'webkit',
    //     isMobile: false,
    //   },
    //   metadata: {
    //     deviceName: 'desktop-safari',
    //   },
    // },
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Samsung Galaxy S20'],
    //     browserName: 'chromium',
    //     isMobile: true,
    //     viewport: { width: 412, height: 915 },
    //   },
    //   metadata: {
    //     deviceName: 'Samsung-Galaxy-20',
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 14'],
    //     isMobile: true,
    //     browserName: 'webkit',
    //     viewport: { width: 412, height: 915 },
    //   },
    //   metadata: {
    //     deviceName: 'Iphone-14',
    //   },
    // },
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'bun run dev',
    port: 3000,
    timeout: 120 * 1000, // 120s
    reuseExistingServer: !process.env.CI,
  },
})
