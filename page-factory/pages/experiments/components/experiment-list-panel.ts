import { expect, Locator, type Page } from "@playwright/test";

/**
 * Page Factory - Navbar
 *
 * Defines all locators and helper functions for the specified component
 */
export class ExperimentListPanel {
    readonly editButton: Locator;
    readonly experimentCountText: Locator;
    readonly experimentItem: Locator;
    readonly experimentItemAvatar: Locator;
    readonly experimentItemCheckbox: Locator;
    readonly experimentItemCreatedDateText: Locator;
    readonly experimentItemNameText: Locator;
    readonly experimentItemProjectNameText: Locator;
    readonly experimentItemSentDateText: Locator;
    readonly searchInput: Locator;

    private readonly page: Page;

    constructor(page: Page) {
        this.editButton = page.getByTestId("toggle-edit");
        this.experimentCountText = page.getByTestId("experiment-count");
        this.experimentItem = page.getByTestId("campaign-nav-item");
        this.experimentItemAvatar = page.getByTestId("campaign-nav-item-creator");
        this.experimentItemCheckbox = page.getByTestId("campaign-nav-item-checkbox");
        this.experimentItemCreatedDateText = page.getByTestId("campaign-nav-item-created-date");
        this.experimentItemNameText = page.getByTestId("campaign-nav-item-name");
        this.experimentItemProjectNameText = page.getByTestId("campaign-nav-item-project-name");
        this.experimentItemSentDateText = page.getByTestId("campaign-nav-item-sent-date");
        this.searchInput = page.getByTestId("campaign-search");

        this.page = page;
    }

    /**
     * Find an experiment in the list and return the locator
     *
     * @param experimentName - the name of the experiment to find
     *
     * @returns the locator of the experiment
     */
    async getExperimentInList(experimentName: string): Promise<Locator> {
        await expect(this.page.getByTestId("campaign-nav-list").getByTestId("next-page-loader")).toHaveCount(0);
        return this.experimentItem.filter({ has: this.page.getByTestId("campaign-nav-item-content").getByText(experimentName, { exact: true }) });
    }
}
