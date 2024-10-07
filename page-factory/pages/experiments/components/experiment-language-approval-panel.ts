import { Locator, type Page } from "@playwright/test";

/**
 * Page Factory - Experiment - Language Approval Panel
 *
 * Defines all locators and helper functions for the specified component
 */
export class ExperimentLanguageApprovalPanel {
    readonly heading: Locator;

    constructor(page: Page) {
        this.heading = page.getByRole("heading", { name: "Jacquard's optimal set for testing:", level: 2 });
    }
}
