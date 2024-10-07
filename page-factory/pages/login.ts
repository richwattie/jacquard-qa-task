import { expect, Locator, type Page } from "@playwright/test";

import { Navbar } from "@components/navbar";
import test from "@lib/base-test";

/**
 * Page Factory - Login
 *
 * Defines all locators and helper functions for the specified page
 */
export class LoginPage {
    readonly forgotPasswordLink: Locator;
    readonly emailInput: Locator;
    readonly emailInputErrorText: Locator;
    readonly errorText: Locator;
    readonly loginButton: Locator;
    readonly passwordInput: Locator;
    readonly passwordInputErrorText: Locator;

    private readonly navbar: Navbar;

    constructor(page: Page, navbar: Navbar) {
        this.forgotPasswordLink = page.getByRole("link", { name: "Forgot your password?" });
        this.loginButton = page.getByLabel("Log In");
        this.errorText = page.getByText("Wrong email or password.", { exact: true });
        this.emailInput = page.getByLabel("Email");
        this.passwordInput = page.getByLabel("Password", { exact: true });
        this.emailInputErrorText = page.locator("#auth0-lock-error-msg-email").locator("div");
        this.passwordInputErrorText = page.locator("#auth0-lock-error-msg-password").locator("div");

        this.navbar = navbar;
    }

    /**
     * Submits login form with specified credentials
     *
     * @param email - The users email address
     * @param password - The users login password
     */
    async enterCredentialsAndSubmit(email = "", password = ""): Promise<void> {
        await test.step("Enter credentials and submit", async () => {
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        });
    }

    /**
     * Submits login form with specified credentials and waits for logged in home page to be displayed
     *
     * @param email - The users email address
     * @param password - The users login password
     */
    async login(email: string, password: string): Promise<void> {
        await this.enterCredentialsAndSubmit(email, password);
        await expect(this.navbar.createButton).toBeVisible({ timeout: 20000 });
    }
}
