import { Locator, type Page } from "@playwright/test";

import { CreateExperimentSidebar } from "@pages/experiments/components/create-experiment-sidebar";
import { ExperimentLanguageApprovalPanel } from "@pages/experiments/components/experiment-language-approval-panel";
import { ExperimentLanguageGenerationPanel } from "@pages/experiments/components/experiment-language-generation-panel";
import { ExperimentListPanel } from "@pages/experiments/components/experiment-list-panel";
import { ExperimentSetupPanel } from "@pages/experiments/components/experiment-setup-panel";

/**
 * Page Factory - Experiments
 *
 * Defines all locators and helper functions for the specified page
 */
export class ExperimentsPage {
    readonly experimentName: Locator;
    readonly insightsTab: Locator;
    readonly languageApprovalTab: Locator;
    readonly languageGenerationTab: Locator;
    readonly nextButton: Locator;
    readonly noExperimentSelectedText: Locator;
    readonly resultsTab: Locator;
    readonly saveButton: Locator;
    readonly setupTab: Locator;

    readonly createExperimentSidebar: CreateExperimentSidebar;
    readonly experimentListPanel: ExperimentListPanel;
    readonly languageApproval: ExperimentLanguageApprovalPanel;
    readonly languageGeneration: ExperimentLanguageGenerationPanel;
    readonly setup: ExperimentSetupPanel;

    constructor(page: Page) {
        this.experimentName = page.getByTestId("campaign-name");
        this.insightsTab = page.getByTestId("campaign-step-insights");
        this.languageApprovalTab = page.getByTestId("campaign-step-language_approval");
        this.languageGenerationTab = page.getByTestId("campaign-step-language_generation");
        this.nextButton = page.getByTestId("next-button");
        this.noExperimentSelectedText = page.getByText("No experiment selected");
        this.resultsTab = page.getByTestId("campaign-step-summary");
        this.saveButton = page.getByTestId("save-button");
        this.setupTab = page.getByTestId("campaign-step-setup");

        this.createExperimentSidebar = new CreateExperimentSidebar(page);
        this.experimentListPanel = new ExperimentListPanel(page);
        this.languageApproval = new ExperimentLanguageApprovalPanel(page);
        this.languageGeneration = new ExperimentLanguageGenerationPanel(page);
        this.setup = new ExperimentSetupPanel(page);
    }
}
