import { expect, test } from '@playwright/test'

test('home route renders the main sections', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Marlon Demas' })).toBeVisible()
  await expect(page.getByText('Engineering solutions for global impact')).toBeVisible()
  await expect(page.getByText('Products that ship')).toBeVisible()
  await expect(page.getByText('Professional journey')).toBeVisible()
  await expect(page.getByText('Let us build the')).toBeVisible()
})

test('projects route renders the full portfolio list', async ({ page }) => {
  await page.goto('/projects')

  await expect(page.getByText('My Project Portfolio')).toBeVisible()
  await expect(page.getByText('Raptor Technologies')).toBeVisible()
  await expect(page.getByText('Prosense (SASSA)')).toBeVisible()
})

test('nav links and outbound CTAs are wired', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('link', { name: 'View Projects' })).toHaveAttribute('href', '/projects')
  await expect(page.getByRole('link', { name: 'Download CV' })).toHaveAttribute(
    'href',
    '/assets/docs/Marlon_Demas_CV.pdf',
  )
})

test('desktop hero matches the designed structure', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.waitForTimeout(1500)

  await expect(page.getByTestId('home-hero')).toHaveScreenshot('home-hero-desktop.png', {
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixelRatio: 0.02,
  })
})

test('featured projects grid matches desktop layout', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 })
  await page.goto('/')
  await page.waitForTimeout(1800)

  await expect(page.getByTestId('featured-projects')).toHaveScreenshot(
    'featured-projects-desktop.png',
    {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
    },
  )
})

test('projects page layout matches desktop layout', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 })
  await page.goto('/projects')
  await page.waitForTimeout(2600)

  await expect(page.getByTestId('projects-list')).toHaveScreenshot('projects-page-desktop.png', {
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixelRatio: 0.02,
  })
})

test('home hero matches mobile layout', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.waitForTimeout(1500)

  await expect(page.getByTestId('home-hero')).toHaveScreenshot('home-hero-mobile.png', {
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixelRatio: 0.02,
  })
})
