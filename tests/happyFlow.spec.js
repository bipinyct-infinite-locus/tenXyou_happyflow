import { test, expect } from "@playwright/test";

test("Happy Flow with waits", async ({ page }) => {
  // Go to login page
  await page.goto("https://tenxyou.infinitelocus.com/auth");
  await page.waitForLoadState("networkidle"); // wait for all resources to settle

  // --- LOGIN ---
  const emailBox = page.getByRole("textbox", { name: "Enter Email Id" });
  await emailBox.waitFor({ state: "visible" });
  await emailBox.fill("bipin@gmail.com");

  const passwordBox = page.getByRole("textbox", { name: "Password" });
  await passwordBox.waitFor({ state: "visible" });
  await passwordBox.fill("12345678");

  const signInBtn = page.getByRole("button", { name: "Sign In" });
  await signInBtn.waitFor({ state: "visible" });
  await signInBtn.click();

  // --- OPEN ADDRESS MENU ---
  const menuBtn = page.locator("button:nth-child(3)").first();
  await menuBtn.waitFor({ state: "visible", timeout: 10000 });
  await menuBtn.click();

  const addressTab = page.getByText("Address");
  await addressTab.waitFor({ state: "visible" });
  await addressTab.click();

  const addAddressBtn = page.getByText("+ Add New Address");
  await addAddressBtn.scrollIntoViewIfNeeded();
  await addAddressBtn.waitFor({ state: "visible" });
  await addAddressBtn.click();

  // --- FILL ADDRESS FORM ---
  await page
    .getByRole("textbox", { name: "Enter Address" })
    .fill("DLF Tower 7B");
  await page.getByRole("textbox", { name: "Enter Pincode" }).fill("122010");
  await page
    .getByRole("textbox", { name: "Enter Landmark" })
    .fill("Cybergreen");
  await page
    .getByRole("textbox", { name: "Enter Locality" })
    .fill("Cybergreen");

  const workBtn = page.getByText("Others");
  await workBtn.scrollIntoViewIfNeeded();
  await workBtn.click();

  await page.locator('input[name="receiverName"]').fill("Bipin");
  await page.locator('input[name="phone"]').fill("7991702806");

  const saveBtn = page.getByRole("button", { name: "SAVE" });
  await saveBtn.scrollIntoViewIfNeeded();
  await saveBtn.waitFor({ state: "visible", timeout: 30000 });
  await saveBtn.click();

  // --- ADD PRODUCT TO CART ---
  await page.getByText("Men").first().hover();

  const subCategory = page.getByText(/Men\s*'?s Cricket Shoes/i);
  await expect(subCategory).toBeVisible({ timeout: 30000 });
  await subCategory.click();

  const product = page.getByText("Cricket Batsman Premium").first();
  await expect(product).toBeVisible({ timeout: 30000 });
  await product.click();

  const addToCartBtn = page.getByRole("button", { name: /add to cart/i });
  await expect(addToCartBtn).toBeVisible({ timeout: 30000 });
  await addToCartBtn.click();

  // --- OPEN CART ---
  const cartBtn = page
    .locator(
      "//div[contains(@data-desktop-navbar,'true')]//button[4]/*[name()='svg']"
    )
    .first();
  await expect(cartBtn).toBeVisible({ timeout: 10000 });
  await cartBtn.click();

  // --- CHECKOUT ---
  const checkoutBtn = page.getByRole("button", { name: "CHECKOUT" });
  await checkoutBtn.click();
  await page.goto("https://tenxyou.infinitelocus.com/checkout");
  await page.waitForLoadState("networkidle");

  // --- PAYMENT ---
  const cashOption = page.locator("#desktop-payment-selection-section p", {
    hasText: "Cash",
  });
  await expect(cashOption).toBeVisible({ timeout: 30000 });
  await cashOption.click();

  const placeOrderBtn = page.getByRole("button", { name: /place order/i });
  await expect(placeOrderBtn).toBeVisible({ timeout: 30000 });
  await placeOrderBtn.click();
});
