import { expect } from "@playwright/test";

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "Enter Email Id" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Sign In" });
    this.successMessage = page.locator("text=Login successful"); // success toast
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 5000 });
  }
}
