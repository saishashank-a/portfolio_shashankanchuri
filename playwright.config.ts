import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e/test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'e2e/playwright-report', open: 'never' }],
  ],
  use: {
    // Port matches `pnpm dev` / `pnpm start` in package.json
    baseURL: 'http://localhost:3100',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      // System Chrome: the Playwright MCP plugin's newer Playwright garbage-collects this repo's bundled Chromium
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
})
