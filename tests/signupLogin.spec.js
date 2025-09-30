// tests/signupLogin.spec.js
import { test } from "@playwright/test";
import { readCSVSync } from "../utils/csvUtil.js";
import SignupPage from "../pages/SignupPage.js";
import LoginPage from "../pages/LoginPage.js";
import { runHappyFlow } from "../flows/happyFlow.js";

// ✅ Read users synchronously at discovery time
const users = readCSVSync("test-data/users.csv");
if (!users || users.length === 0) throw new Error("No users found in CSV");

test.describe.parallel("Signup → Login → Happy Flow", () => {
  users.forEach((user) => {
    test(`User flow for ${user.email}`, async ({ page }) => {
      const signupPage = new SignupPage(page);
      const loginPage = new LoginPage(page);

      const uniqueEmail = `${user.email.split("@")[0]}_${Date.now()}@${
        user.email.split("@")[1]
      }`;

      // --- SIGNUP ---
      await signupPage.goto();
      await signupPage.signup(uniqueEmail, user.password);
      await signupPage.verifySignupSuccessAndGoToLogin();

      // --- LOGIN ---
      await loginPage.login(uniqueEmail, user.password);
      await loginPage.verifyLoginSuccess();

      // --- HAPPY FLOW ---
      await runHappyFlow(page);
    });
  });
});
