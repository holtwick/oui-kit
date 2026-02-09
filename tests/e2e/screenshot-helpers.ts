import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

/**
 * Standard screenshot options for consistent visual testing
 * across different machines and environments
 */
export const screenshotOptions = {
  // Disable animations for consistent screenshots
  animations: 'disabled',
  // Use consistent clipping
  clip: undefined,
  // Disable full page to avoid scrollbar differences
  fullPage: false,
  // Omit background for consistent alpha handling
  omitBackground: false,
  // Use PNG format for better compression and consistency
  type: 'png',
  // Set consistent quality
  quality: 100,
  // Set a reasonable threshold for visual differences
  threshold: 0.1, // 10% tolerance for minor rendering differences
  // Allow a small number of pixels to differ
  maxDiffPixels: 50,
} as const

/**
 * Screenshot options specifically for full page captures
 */
export const fullPageScreenshotOptions = {
  ...screenshotOptions,
  fullPage: true,
} as const

/**
 * Wait for all animations and transitions to complete
 * before taking screenshots
 */
export async function waitForAnimations(page: Page, timeout = 1000) {
  // Wait for CSS transitions and animations to complete
  await page.waitForFunction(() => {
    const animations = document.getAnimations()
    return animations.every(animation =>
      animation.playState === 'finished'
      || animation.playState === 'idle',
    )
  }, { timeout })

  // Additional wait for any remaining visual changes
  await page.waitForTimeout(300)
}

/**
 * Prepare page for consistent screenshots by:
 * - Hiding scrollbars
 * - Disabling hover effects temporarily
 * - Ensuring consistent font rendering
 * - Handling browser-specific differences
 */
export async function preparePageForScreenshot(page: Page) {
  // Get browser name for specific adjustments
  const browserName = page.context().browser()?.browserType().name() || 'unknown'

  await page.addStyleTag({
    content: `
      /* Hide scrollbars for consistent screenshots across browsers */
      ::-webkit-scrollbar { width: 0px; background: transparent; }
      * { 
        scrollbar-width: none; 
        -ms-overflow-style: none;
      }
      
      /* Disable hover effects during screenshots */
      *, *:hover, *:focus { 
        transition: none !important; 
        animation: none !important;
      }
      
      /* Ensure consistent font rendering across browsers */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: normal;
        font-variant-ligatures: none;
      }
      
      /* Browser-specific font rendering consistency */
      ${browserName === 'firefox'
        ? `
        * {
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
        }
      `
        : ''}
      
      ${browserName === 'webkit'
        ? `
        * {
          -webkit-font-smoothing: subpixel-antialiased;
          text-rendering: geometricPrecision;
        }
      `
        : ''}
      
      /* Disable cursor for consistent screenshots */
      * { cursor: none !important; }
      
      /* Force consistent line heights */
      * { line-height: normal; }
      
      /* Disable text selection highlighting */
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `,
  })

  // Browser-specific preparations
  if (browserName === 'firefox') {
    // Firefox sometimes needs extra time for font loading
    await page.waitForTimeout(200)
  }

  if (browserName === 'webkit') {
    // WebKit/Safari specific preparations
    await page.evaluate(() => {
      // Disable smooth scrolling in WebKit
      document.documentElement.style.scrollBehavior = 'auto'
    })
  }
}

/**
 * Take a screenshot with consistent options and preparation
 */
export async function takeConsistentScreenshot(
  locatorOrPage: Page | any,
  name: string,
  options: any = {},
) {
  const page = 'locator' in locatorOrPage ? locatorOrPage.page() : locatorOrPage

  // Prepare page for screenshot
  await preparePageForScreenshot(page)

  // Wait for animations to complete
  await waitForAnimations(page)

  // Take screenshot with consistent options
  const finalOptions = {
    ...screenshotOptions,
    ...options,
  }

  if ('toHaveScreenshot' in locatorOrPage) {
    // This is a locator
    return await locatorOrPage.toHaveScreenshot(name, finalOptions)
  }
  else {
    // This is a page
    return await expect(locatorOrPage).toHaveScreenshot(name, finalOptions)
  }
}
