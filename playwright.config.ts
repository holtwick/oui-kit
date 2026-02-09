import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './',
  testMatch: ['**/tests/e2e/**/*.e2e.spec.ts', '**/lib/**/*.e2e.ts'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Increase timeout for demo tests */
  timeout: 60000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5174',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Collect screenshots on failure */
    screenshot: 'only-on-failure',

    /* Increase expect timeouts for visual tests */
    actionTimeout: 10000,

    /* Force consistent viewport and device pixel ratio for screenshots */
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,

    /* Force consistent browser settings */
    ignoreHTTPSErrors: true,
    bypassCSP: true,
  },

  expect: {
    /* Increase screenshot comparison timeout */
    timeout: 10000,

    /* Configure visual comparison settings */
    toHaveScreenshot: {
      threshold: 0.3, // 30% tolerance for minor rendering differences
      maxDiffPixels: 100, // Allow up to 100 pixels to differ
      mode: 'pixel',
      animations: 'disabled',
    },
    toMatchSnapshot: {
      threshold: 0.3, // 30% tolerance for minor rendering differences
      maxDiffPixels: 100, // Allow up to 100 pixels to differ
      mode: 'pixel',
    },
  } as any,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        /* Override device settings for consistent screenshots */
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        /* Disable hardware acceleration for consistent rendering */
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=TranslateUI',
            '--disable-ipc-flooding-protection',
            '--disable-renderer-backgrounding',
            '--disable-backgrounding-occluded-windows',
            '--disable-background-timer-throttling',
            '--force-device-scale-factor=1',
            '--high-dpi-support=1',
            '--force-color-profile=srgb',
          ],
        },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        /* Override device settings for consistent screenshots */
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        /* Firefox-specific launch options for consistency */
        launchOptions: {
          firefoxUserPrefs: {
            // Force device pixel ratio to 1
            'layout.css.devPixelsPerPx': '1.0',
            // Disable hardware acceleration
            'gfx.webrender.enabled': false,
            'layers.acceleration.disabled': true,
            // Force sRGB color profile
            'gfx.color_management.mode': 2,
            'gfx.color_management.rendering_intent': 0,
            // Disable smooth scrolling for consistent screenshots
            'general.smoothScroll': false,
            // Disable animations
            'toolkit.cosmeticAnimations.enabled': false,
            // Force consistent font rendering
            'gfx.font_rendering.cleartype_params.rendering_mode': 5,
          },
        },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        /* Override device settings for consistent screenshots */
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        /* WebKit-specific settings for consistency */
        launchOptions: {
          // WebKit/Safari doesn't support as many flags, but we can set some
          args: [
            '--disable-web-security',
          ],
        },
      },
    },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm dev:e2e',
    url: 'http://localhost:5174',
    reuseExistingServer: !process.env.CI,
  },
})
