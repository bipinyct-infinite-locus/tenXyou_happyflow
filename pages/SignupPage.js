import { expect } from "@playwright/test";

export default class SignupPage {
  constructor(page) {
    this.page = page;
    this.signupNavButton = page.getByRole("button", {
      name: "Don't have an account? Sign",
    });
    this.emailInput = page.getByRole("textbox", { name: "Enter Email Id" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.signupButton = page.getByRole("button", { name: "Sign Up" });
    this.successMessage = page.locator("text=Signup successful"); // your app's toast
    this.loginRedirectButton = page.getByRole("button", {
      name: "Already a user? Login here",
    });
  }

  async goto() {
    await this.page.goto("/auth");
  }

  async signup(email, password) {
    await this.signupNavButton.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signupButton.click();
  }

  async verifySignupSuccessAndGoToLogin() {
    // Wait for success message
    await expect(this.successMessage).toBeVisible({ timeout: 5000 });

    // Click "Already a user? Login here" after success
    await this.loginRedirectButton.click();

    // Wait until login email input is visible
    const emailInput = this.page.getByRole("textbox", {
      name: "Enter Email Id",
    });
    await emailInput.waitFor({ state: "visible", timeout: 5000 });
  }
}
