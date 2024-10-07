import { Locator, type Page } from "@playwright/test";

/**
 * Page Factory - Experiment - Language Generation Panel
 *
 * Defines all locators and helper functions for the specified component
 */
export class ExperimentLanguageGenerationPanel {
    readonly sendDateInput: Locator;
    readonly discountPercentageInput: Locator;
    readonly promotingProductInput: Locator;

    private readonly languageGenerationPanel: Locator;

    constructor(page: Page) {
        this.languageGenerationPanel = page.getByTestId("campaign-language-generation-page");

        this.sendDateInput = this.languageGenerationPanel.getByRole("textbox", { name: "Date" });
        this.discountPercentageInput = this.languageGenerationPanel.getByPlaceholder("E.g. '10'");
        this.promotingProductInput = this.languageGenerationPanel.getByPlaceholder("E.g. jackets");
    }

    /**
     * Select an option from the campaign type dropdown
     *
     * @param option - The option to select
     */
    async selectCampaignTypeDropdownOption(option: string): Promise<void> {
        const parentLocator = this.languageGenerationPanel.getByTitle("What type of campaign is this?").locator("xpath=../following-sibling::div");

        await parentLocator.getByRole("combobox").click();
        await parentLocator.getByRole("option", { name: option }).click();
    }

    /**
     * Yes / No button option for the 'up to' field.
     *
     * @param value - The value to set
     */
    async selectUpToTextToggle(value: boolean): Promise<void> {
        await this.languageGenerationPanel
            .getByText("Would you like to say 'up to' before the discount?")
            .locator("xpath=../following-sibling::div")
            .getByRole("button", { name: value ? "Yes" : "No" })
            .click();
    }
}
