import { expect } from "@playwright/test";

import test from "@lib/base-test";

test.use({ storageState: { cookies: [], origins: [] } });

[
    {
        scenario: "Correct email with wrong password",
        email: process.env.EMAIL,
        password: "aaaaaaaaa"
    },
    {
        scenario: "Non existent email address",
        email: "rich-wattie-test@jacquard.com",
        password: process.env.PASSWORD
    }
].forEach(({ scenario, email, password }) => {
    test(`${scenario}`, async ({ loginPage }) => {
        await test.step("Enter credentials and submit", async () => {
            await loginPage.emailInput.fill(email);
            await loginPage.passwordInput.fill(password);
            await loginPage.loginButton.click();
        });

        await test.step("Assertion", async () => {
            await expect(loginPage.errorText).toBeVisible();
        });
    });
});
