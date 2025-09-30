import { expect } from "@playwright/test";

export async function runHappyFlow(page) {
  await page.waitForLoadState("networkidle"); // make sure all resources are loaded

  // --- OPEN ADDRESS MENU ---
  const menuBtn = page.locator("button:nth-child(3)").first();
  await expect(menuBtn).toBeVisible({ timeout: 10000 });
  await menuBtn.click();

  const addressTab = page.getByText("Address");
  await expect(addressTab).toBeVisible();
  await addressTab.click();

  const addAddressBtn = page.getByText("+ Add New Address");
  await addAddressBtn.scrollIntoViewIfNeeded();
  await expect(addAddressBtn).toBeVisible();
  await addAddressBtn.click();

  // --- FILL ADDRESS FORM ---
  await page
    .getByRole("textbox", { name: "Enter Address" })
    .fill("DLF Tower 7B");
  await page.waitForTimeout(2500); // wait 2.5 seconds

  await page.getByRole("textbox", { name: "Enter Pincode" }).fill("122010");
  await page.waitForTimeout(2500);

  await page
    .getByRole("textbox", { name: "Enter Landmark" })
    .fill("Cybergreen");
  await page.waitForTimeout(2500);

  await page
    .getByRole("textbox", { name: "Enter Locality" })
    .fill("Cybergreen");
  await page.waitForTimeout(2500);

  const workBtn = page.getByText("Others");
  await workBtn.scrollIntoViewIfNeeded();
  await workBtn.click();

  await page.locator('input[name="receiverName"]').fill("Bipin");
  await page.locator('input[name="phone"]').fill("7991702806");

  const saveBtn = page.getByRole("button", { name: "SAVE" });
  await saveBtn.scrollIntoViewIfNeeded();
  await expect(saveBtn).toBeVisible({ timeout: 30000 });
  await saveBtn.click();
  await page.waitForTimeout(2500);

  // --- ADD PRODUCT TO CART ---
  // Hover over main category to open the mega menu
  const menCategory = page.getByText("Men").first();
  await menCategory.hover();

  // Wait explicitly for the subcategory to appear
  const subCategory = page.getByText(/Men\s*'?s Cricket Shoes/i);
  await subCategory.waitFor({ state: "visible", timeout: 50000 }); // increase timeout if needed

  // Scroll into view just in case and click
  await subCategory.scrollIntoViewIfNeeded();
  await subCategory.click();

  const product = page.getByText("Cricket Batsman Premium").first();
  await expect(product).toBeVisible({ timeout: 60000 });
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
  await page.goto("https://tenxyou.infinitelocus.com/checkout", {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  // --- PAYMENT ---
  const cashOption = page.locator("#desktop-payment-selection-section p", {
    hasText: "Cash",
  });
  await expect(cashOption).toBeVisible({ timeout: 30000 });
  await cashOption.click();

  const placeOrderBtn = page.getByRole("button", { name: /place order/i });
  await expect(placeOrderBtn).toBeVisible({ timeout: 30000 });
  await placeOrderBtn.click();
}
