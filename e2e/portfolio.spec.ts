import { test, expect } from '@playwright/test'
import path from 'path'

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots')

// ────────────────────────────────────────────────────────────
// Homepage
// ────────────────────────────────────────────────────────────
test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads with a 200-level response', async ({ page }) => {
    // If the page loaded (no throw from goto), we already have a 200.
    // Assert something fundamental is present.
    await expect(page).toHaveURL('/')
  })

  test('hero headline is visible', async ({ page }) => {
    // Hero <h1> is the signature: letters are aria-hidden framer-motion spans,
    // the accessible name comes from aria-label, so match on that.
    const h1 = page.getByRole('heading', { level: 1, name: 'Shashank Anchuri' })
    await expect(h1).toBeVisible()
  })

  test('navigation bar is visible', async ({ page }) => {
    // Navbar is rendered as a <nav> element
    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()
  })

  test('projects section heading is present', async ({ page }) => {
    // Projects section heading: "Things I've built."
    const heading = page.getByRole('heading', { name: /Things I've built/i })
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
  })

  test('contact section heading is present', async ({ page }) => {
    // Contact section heading: "Let's Build Something"
    const heading = page.getByRole('heading', { name: /Let's Build Something/i })
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
  })

  test('captures homepage screenshot', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'homepage.png'),
      fullPage: true,
    })
  })
})

// ────────────────────────────────────────────────────────────
// Blog index
// ────────────────────────────────────────────────────────────
test.describe('Blog page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog')
  })

  test('blog page loads', async ({ page }) => {
    await expect(page).toHaveURL('/blog')
  })

  test('heading "Context Window" is visible', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Context Window/i })
    ).toBeVisible()
  })

  test('at least one post link is visible', async ({ page }) => {
    // Posts are rendered as <a> links; at least one should exist
    const postLinks = page.locator('a[href*="/blog/"]')
    await expect(postLinks.first()).toBeVisible()
  })

  test('TurboQuant post is listed', async ({ page }) => {
    const link = page.locator(
      'a[href*="turboquant-how-google-just-made-ai-6x-cheaper"]'
    )
    await expect(link).toBeVisible()
  })

  test('captures blog index screenshot', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'blog-index.png'),
      fullPage: true,
    })
  })
})

// ────────────────────────────────────────────────────────────
// Blog post – TurboQuant
// ────────────────────────────────────────────────────────────
test.describe('Blog post – TurboQuant', () => {
  const POST_URL =
    '/blog/turboquant-how-google-just-made-ai-6x-cheaper'

  test.beforeEach(async ({ page }) => {
    await page.goto(POST_URL)
  })

  test('post page loads', async ({ page }) => {
    await expect(page).toHaveURL(POST_URL)
  })

  test('post heading is visible', async ({ page }) => {
    // Target h1 specifically — the page also has h2s containing "TurboQuant"
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('TurboQuant')
  })

  test('back link to blog index is present', async ({ page }) => {
    // "← The AI Weekly" is the top back-link; use first() to avoid strict mode
    // violation from the footer's "← Back to The AI Weekly" link
    const backLink = page.locator('a[href="/blog"]').first()
    await expect(backLink).toBeVisible()
  })

  test('audio player is rendered', async ({ page }) => {
    // The AudioPlayer component wraps an <audio> element
    const audio = page.locator('audio')
    await expect(audio).toBeAttached()
  })

  test('audio player play button is visible with correct aria-label', async ({ page }) => {
    // AudioPlayer uses aria-label="Play podcast" / "Pause podcast"
    const playBtn = page.locator('[aria-label="Play podcast"]')
    await expect(playBtn).toBeVisible()
  })

  test('audio player progress slider is present', async ({ page }) => {
    const slider = page.locator('[role="slider"][aria-label="Seek"]')
    await expect(slider).toBeAttached()
  })

  test('captures blog post screenshot', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'blog-post-turboquant.png'),
      fullPage: true,
    })
  })
})

// ────────────────────────────────────────────────────────────
// Navigation – clicking blog post from index
// ────────────────────────────────────────────────────────────
test.describe('Navigation flow', () => {
  test('can navigate from blog index to TurboQuant post', async ({ page }) => {
    await page.goto('/blog')

    const postLink = page.locator(
      'a[href*="turboquant-how-google-just-made-ai-6x-cheaper"]'
    ).first()
    await expect(postLink).toBeVisible()
    await postLink.click()

    await expect(page).toHaveURL(/turboquant-how-google-just-made-ai-6x-cheaper/)
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('TurboQuant')
  })
})
