import { defineConfig, devices } from '@playwright/test';
import { AUTH_FILE } from './config/paths';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Never block the terminal serving the report; open it with `npm run report`. */
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.lightmenu.app',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  projects: [
    /* Logs in once and saves the session to AUTH_FILE. */
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    /* API tests hit Supabase/REST directly via the `request` fixture.
       No browser needed, so they get their own project instead of running
       under chromium's page/device setup. */
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
    },

    /* Logged-out tests (public pages, the login form, other sites).
       They never wait on setup, so a login problem cannot block them. */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [/.*\.authed\.spec\.ts/, /.*\.api\.spec\.ts/],
    },

    /* Tests named *.authed.spec.ts start already logged in. */
    {
      name: 'chromium-authed',
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
      testMatch: /.*\.authed\.spec\.ts/,
      dependencies: ['setup'],
    },

    // Cross-browser comes later, once the suite is stable on one browser.
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: /.*\.authed\.spec\.ts/ },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /.*\.authed\.spec\.ts/ },
  ],
});
