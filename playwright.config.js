// playwright.config.js
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // keep your test files organized
  timeout: 30 * 1000, // max time per test
  expect: {
    timeout: 5000, // assertion timeout
  },
  fullyParallel: true, // run tests in parallel
  forbidOnly: !!process.env.CI, // fail build if test.only is left in CI
  retries: process.env.CI ? 2 : 0, // retry on CI only
  workers: process.env.CI ? 2 : undefined, // limit workers on CI

  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "html-report" }],
    ["json", { outputFile: "test-results.json" }],
  ],

  use: {
    baseURL:
      process.env.ENV === "prod"
        ? "https://prod.tenxyou.com"
        : "https://tenxyou.infinitelocus.com",
    headless: true,
    trace: "on-first-retry", // useful for debugging
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10 * 1000,
    navigationTimeout: 15 * 1000,
  },

  // Device/browser projects (cross-browser testing)
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
});
