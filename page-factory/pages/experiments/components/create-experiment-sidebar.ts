import { Locator, type Page } from "@playwright/test";

/**
 * Page Factory - Create Experiment Sidebar
 *
 * Defines all locators and helper functions for the specified component
 */
export class CreateExperimentSidebar {
    readonly cancelButton: Locator;
    readonly experimentNameInput: Locator;
    readonly experimentNameInputNoNameErrorText: Locator;
    readonly experimentNameInputInvalidCharactersErrorText: Locator;
    readonly experimentNameInputMaxLengthErrorText: Locator;

    constructor(page: Page) {
        this.cancelButton = page.getByTestId("cancel-campaign-creation");
        this.experimentNameInput = page.getByTestId("campaign-name-input");
        this.experimentNameInputNoNameErrorText = page.getByText("Please enter experiment name");
        this.experimentNameInputInvalidCharactersErrorText = page.getByText(
            "Jacquard only accepts letters, numbers, spaces, hyphens and underscores in experiment names."
        );
        this.experimentNameInputMaxLengthErrorText = page.getByText(
            "Your experiment name is 1 character too long. It should be less than 128 characters."
        );
    }

    /**
     * Set the name of the experiment
     *
     * @param name - The experiment name
     */
    async setExperimentName(name: string): Promise<void> {
        await this.experimentNameInput.fill(name);
        await this.experimentNameInput.blur();
    }
}
