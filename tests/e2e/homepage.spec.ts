import { expect, test } from '@nuxt/test-utils/playwright'

test.beforeEach(async ({ page }) => {
  console.log('Running before each test')
  await page.goto('')
  console.log('Navigated to the home page')
})

test.describe('Gratitude Jar Home Page', () => {
  test('should display the correct page title and header', async ({ page }) => {
    // Check the page title
    await expect(page).toHaveTitle(/Gratitude Jar/)

    // Check the header text
    const header = page.locator('h1')
    await expect(header).toHaveText('Gratitude Jar')
  })

  test('should display login buttons', async ({ page }) => {
    // Check if GitHub login button is visible
    const githubLoginButton = page.locator('button', { hasText: 'GitHub Login' })
    await expect(githubLoginButton).toBeVisible()

    // Check if Google login button is visible
    const googleLoginButton = page.locator('button', { hasText: 'Google Login' })
    await expect(googleLoginButton).toBeVisible()
  })

  test('should display welcome message', async ({ page }) => {
    // Check the welcome message text
    const welcomeMessage = page.locator('p', { hasText: 'Welcome to the Gratitude Jar!' })
    await expect(welcomeMessage).toBeVisible()
  })

  test('should navigate to Info & Disclaimers page', async ({ page }) => {
    // Click on the Info & Disclaimers link
    const infoLink = page.locator('a[data-test="info-link"]')
    await infoLink.click()

    // Verify navigation to the correct URL
    await expect(page).toHaveURL(/\/info/)

    // Verify the presence of expected content on the title page
    await expect(page).toHaveTitle(/Info & Disclaimers/)
  })

  test('should display footer content', async ({ page }) => {
    // Check the footer content
    const footerText = page.locator('p[data-test="footer-made-by"]')
    await expect(footerText).toContainText('Made with')

    // Check the GitHub link in the footer
    const githubLink = page.locator('a[data-test="github-link"]')
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/Archetipo95')
  })
})
