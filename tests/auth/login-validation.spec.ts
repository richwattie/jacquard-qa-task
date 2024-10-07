import { expect } from "@playwright/test";

import test from "@lib/base-test";

test.use({ storageState: { cookies: [], origins: [] } });

const EMAIL_BLANK_ERROR = "Email can't be blank";
const EMAIL_INVALID_ERROR = "Email is invalid";
const PASSWORD_BLANK_ERROR = "Password can't be blank";

test("No email or password supplied", async ({ loginPage }) => {
    await loginPage.enterCredentialsAndSubmit();

    await test.step("Assertion", async () => {
        await expect.soft(loginPage.emailInputErrorText).toHaveText(EMAIL_BLANK_ERROR);
        await expect.soft(loginPage.passwordInputErrorText).toHaveText(PASSWORD_BLANK_ERROR);
    });
});

test("Valid email but no password supplied", async ({ loginPage }) => {
    await loginPage.enterCredentialsAndSubmit(process.env.EMAIL);

    await test.step("Assertion", async () => {
        await expect.soft(loginPage.passwordInputErrorText).toHaveText(PASSWORD_BLANK_ERROR);
    });
});

test("Valid password but no email supplied", async ({ loginPage }) => {
    await loginPage.enterCredentialsAndSubmit("", process.env.PASSWORD);

    await test.step("Assertion", async () => {
        await expect.soft(loginPage.emailInputErrorText).toHaveText(EMAIL_BLANK_ERROR);
    });
});

test("Invalid email format supplied", async ({ loginPage }) => {
    await loginPage.enterCredentialsAndSubmit("aaa");

    await test.step("Assertion", async () => {
        await expect.soft(loginPage.emailInputErrorText).toHaveText(EMAIL_INVALID_ERROR);
    });
});
