import { test } from "@playwright/test";
import { readCSV } from "../utils/csvUtil.js";
import SignupPage from "../pages/SignupPage.js";
import LoginPage from "../pages/LoginPage.js";

test.describe("Signup → Login Flow - CSV Driven", () => {
  let users = [];

  test.beforeAll(async () => {
    users = await readCSV("test-data/users.csv");
    if (!users || users.length === 0) throw new Error("No users found in CSV");
  });

  test("Signup and immediately login", async ({ page }) => {
    for (const user of users) {
      const signupPage = new SignupPage(page);

      // Make email unique
      const uniqueEmail = `${user.email.split("@")[0]}_${Date.now()}@${
        user.email.split("@")[1]
      }`;

      // --- SIGNUP ---
      await signupPage.goto();
      await signupPage.signup(uniqueEmail, user.password);

      // Wait for success and go to login form
      await signupPage.verifySignupSuccessAndGoToLogin();

      // --- LOGIN ---
      const loginPage = new LoginPage(page);
      await loginPage.login(uniqueEmail, user.password);
      await loginPage.verifyLoginSuccess();
    }
  });
});
