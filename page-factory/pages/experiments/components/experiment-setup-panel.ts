import { expect, Locator, type Page } from "@playwright/test";

type ExperimentType = "Email" | "Push" | "SMS" | "Facebook & Instagram" | "Web & App" | "In App Message" | "Content Card";

type EmailSetupForm = {
    averageOpenRate: number | string;
    controlSubjectLine: string;
    expectedAudienceSize: number | string;
    primaryGoal: string;
};

/**
 * Page Factory - Experiment - Setup Panel
 *
 * Defines all locators and helper functions for the specified component
 */
export class ExperimentSetupPanel {
    readonly averageOpenRateInput: Locator;
    readonly controlSubjectLineInput: Locator;
    readonly expectedAudienceSizeInput: Locator;
    readonly primaryGoalDropdown: Locator;
    readonly projectDropdown: Locator;
    readonly splitsDropdown: Locator;

    private readonly page: Page;

    constructor(page: Page) {
        this.averageOpenRateInput = page.getByTestId("campaign-setup-baseline-open-rate");
        this.controlSubjectLineInput = page.getByTestId("campaign-setup-campaign-own-sl");
        this.expectedAudienceSizeInput = page.getByTestId("campaign-setup-list-size");
        this.primaryGoalDropdown = page.getByTestId("campaign-setup-primary-goal");
        this.projectDropdown = page.getByTestId("campaign-setup-select-project");
        this.splitsDropdown = page.getByText("Select the right number").locator("+div").locator("css=[data-testid='selected-value-label']");

        this.page = page;
    }

    /**
     * Fills the email type form
     *
     * @param project - The experiment type to select
     * @param formData - Form data for Email experiment type
     */
    async fillEmailForm(project: string, formData: EmailSetupForm): Promise<void> {
        await this.selectExperimentType("Email");
        // Wait for the last field on the setup panel to be visible. This should ensure the page has rendered sufficiently to be able to continue.
        await expect(this.primaryGoalDropdown).toBeVisible();

        await this.selectProjectDropdownOption(project);
        await this.controlSubjectLineInput.fill(formData.controlSubjectLine);
        await this.selectPrimaryGoalDropdownOption(formData.primaryGoal);
        await this.expectedAudienceSizeInput.fill(String(formData.expectedAudienceSize));
        await this.averageOpenRateInput.fill(String(formData.averageOpenRate));

        // Wait for the splits dropdown to be visible before continuing.
        // 20s timeout may be overkill, but it's evident that this can take longer than what may
        // be desirable and the globally set timeout of 10s has intermittently not been sufficient.
        await expect(this.splitsDropdown).toBeVisible({ timeout: 20000 });
    }

    /**
     * Select experiment type from list
     *
     * @param experimentType - The experiment type to select
     */
    async selectExperimentType(experimentType: ExperimentType): Promise<void> {
        let testId: string;

        switch (experimentType) {
            case "Email":
                testId = "email";
                break;
            case "Push":
                testId = "push_notification";
                break;
            case "SMS":
                testId = "SMS";
                break;
            case "Facebook & Instagram":
                testId = "facebook";
                break;
            case "Web & App":
                testId = "landing_page";
                break;
            case "In App Message":
                testId = "in_app_message";
                break;
            case "Content Card":
                testId = "content_card";
                break;
            default:
                throw new Error(`Experiment type ${experimentType} not supported`);
        }

        await this.page.getByTestId(testId).click();
    }

    /**
     * Select an option from the primary goal dropdown
     *
     * @param option - The option to select
     */
    async selectPrimaryGoalDropdownOption(option: string): Promise<void> {
        await this.primaryGoalDropdown.click();
        await this.primaryGoalDropdown.locator("xpath=..").locator("+div").getByRole("option", { name: option }).click();
    }

    /**
     * Select an option from the project dropdown
     *
     * @param option - The option to select
     */
    async selectProjectDropdownOption(option: string): Promise<void> {
        await this.projectDropdown.locator("svg").click();
        await this.projectDropdown.locator("+div").getByRole("option", { name: option }).click();
    }
}
