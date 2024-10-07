import { Locator, type Page } from "@playwright/test";

/**
 * Page Factory - Navbar
 *
 * Defines all locators and helper functions for the specified component
 */
export class Navbar {
    readonly adminButton: Locator;
    readonly createButton: Locator;
    readonly contentButton: Locator;
    readonly experimentsButton: Locator;
    readonly homeButton: Locator;
    readonly reportsButton: Locator;

    private readonly page: Page;

    constructor(page: Page) {
        this.adminButton = page.getByTestId("admin-menu-button-dropdown");
        this.createButton = page.getByTestId("nav-create-menu-button");
        this.contentButton = page.getByTestId("Content-nav-button-item");
        this.experimentsButton = page.getByTestId("experiments-nav-button-item");
        this.homeButton = page.getByTestId("home-nav-button-item");
        this.reportsButton = page.getByTestId("reports-menu-button-dropdown");

        this.page = page;
    }

    /**
     * Create experiment from Create button menu
     *
     * Opens a sidebar to create an experiment.
     */
    async openCreateExperimentSidebar(): Promise<void> {
        await this.createButton.click();
        await this.page.getByRole("menuitem", { name: "Experiment" }).click();
    }
}
