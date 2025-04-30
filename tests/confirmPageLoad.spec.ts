import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://saucelabs.com/");
});

test.describe("Verify Homepage Loads and Key Elements are Visible", () => {
  test("Verify Page Title", async ({ page }) => {
    await expect(page).toHaveTitle(/Sauce Labs/);
  });

  test("Verify page Main body heading", async ({ page }) => {
    const title = page.getByText(
      "Build apps users love with AI-driven insights"
    );

    await expect(title).toBeVisible();
  });

  test("Try for Free button is visible", async ({ page }) => {
    const tryBtn = page.getByRole("button", { name: "Try it free" });
    await expect(tryBtn).toBeVisible();
    await tryBtn.click();

    //await page.waitForTimeout(5000);

    await expect(page).toHaveURL("https://saucelabs.com/sign-up");
  });

  test("Confirm Sign for Free Trial", async ({ page }) => {
    const tryBtn = await page
      .getByRole("button", { name: "Try it free" })
      .click();

    await page.locator("#signUpWithEmail").click();

    await expect(page).toHaveURL("https://saucelabs.com/sign-up/register");

    await page.getByRole("textbox", { name: "email" }).fill("test@test.com");
    await page.getByRole("textbox", { name: "username" }).fill("test");
    await page.getByRole("textbox", { name: "password" }).fill("Test1234@");

    await page.getByRole("button", { name: "Sign up" }).click();

    page.waitForTimeout(5000);
  });

  test("Navigate to Pricing Page and Verify Content", async ({ page }) => {
    await page.getByText("Pricing").click();

    await expect(page).toHaveURL("https://saucelabs.com/pricing");

    const annualBtn = page.locator('[role="tab"]').first();

    await expect(annualBtn).toBeVisible();
    const livePlan = page.locator('h3:has-text("Live Testing")').first();
    const virtualPlan = page.locator('h3:has-text("Virtual Cloud")').first();
    const devicePlan = page.locator('h3:has-text("Real Device Cloud")').first();
    await expect(livePlan).toBeVisible();
    await expect(virtualPlan).toBeVisible();
    await expect(devicePlan).toBeVisible();

    //await page.locator();
  });

  test("Explore Resources Section and Access a Resource", async ({ page }) => {
    const resourcesMenu = page.locator("text=Resources").first();

    await resourcesMenu.hover();
  });
});
