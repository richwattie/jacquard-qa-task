import { expect } from "@playwright/test";

import test from "@lib/base-test";

const PROJECT = "External automation project B";

[
    {
        experimentName: "ab cdefghijkl mnopq rstuvw xyz",
        formData: {
            setup: {
                averageOpenRate: 5,
                controlSubjectLine: "[]#{}~;':@,./<>?`¬|!\"£$%^&*()_+-=",
                expectedAudienceSize: 100,
                primaryGoal: "Open rate"
            },
            languageGeneration: {
                campaignType: "Discount off Product",
                promotingProduct: "Mugs",
                discountPercentage: "50",
                sendDate: "19 Oct 2024",
                upToText: true
            }
        }
    },
    {
        experimentName: "ABCDEFGHIJ KLMNOPQRSTUVWXY Z",
        formData: {
            setup: {
                averageOpenRate: 10,
                controlSubjectLine: "abcdefghijklmnopqrstuvwxyz",
                expectedAudienceSize: 50000,
                primaryGoal: "Open rate"
            },
            languageGeneration: {
                campaignType: "Discount off Product",
                promotingProduct: "Maserati Ghibli",
                discountPercentage: "5",
                sendDate: "21 Nov 2024",
                upToText: false
            }
        }
    },
    {
        experimentName: "0123456789",
        formData: {
            setup: {
                averageOpenRate: 15,
                controlSubjectLine: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                expectedAudienceSize: 25000,
                primaryGoal: "Open rate"
            },
            languageGeneration: {
                campaignType: "Discount off Product",
                promotingProduct: "Fresh Air",
                discountPercentage: "100",
                sendDate: "25 Dec 2024",
                upToText: true
            }
        }
    },
    {
        experimentName: "Rich-W_1",
        formData: {
            setup: {
                averageOpenRate: 20,
                controlSubjectLine: "0123456789",
                expectedAudienceSize: 5000,
                primaryGoal: "Open rate"
            },
            languageGeneration: {
                campaignType: "Discount off Product",
                promotingProduct: "Rubik's Cubes",
                discountPercentage: "20",
                sendDate: "29 Feb 2028",
                upToText: false
            }
        }
    }
].forEach(({ experimentName, formData }) => {
    test(`Create an email experiment - ${experimentName}`, async ({ experimentsPage, navbar }) => {
        await test.step("Open create experiment sidebar", async () => {
            await navbar.openCreateExperimentSidebar();
        });

        await test.step("Set experiment name", async () => {
            await experimentsPage.createExperimentSidebar.setExperimentName(experimentName);
        });

        await test.step("Fill experiment setup form", async () => {
            await experimentsPage.setup.fillEmailForm(PROJECT, formData.setup);
            await experimentsPage.nextButton.click();
        });

        await test.step("Fill experiment language generation form", async () => {
            await experimentsPage.languageGeneration.sendDateInput.fill(formData.languageGeneration.sendDate);
            await experimentsPage.languageGeneration.selectCampaignTypeDropdownOption(formData.languageGeneration.campaignType);
            await experimentsPage.languageGeneration.promotingProductInput.fill(formData.languageGeneration.promotingProduct);
            await experimentsPage.languageGeneration.discountPercentageInput.fill(formData.languageGeneration.discountPercentage);
            await experimentsPage.languageGeneration.selectUpToTextToggle(formData.languageGeneration.upToText);
            await experimentsPage.nextButton.click();
        });

        await test.step("Assertion", async () => {
            await expect.soft(experimentsPage.languageApproval.heading).toBeVisible();
            await expect.soft(await experimentsPage.experimentListPanel.getExperimentInList(experimentName)).toBeVisible();
        });
    });
});

test("Cancelling the create experiment form should not create an experiment", async ({ experimentsPage, navbar }) => {
    const experimentName = "Cancel Test";

    await test.step("Open create experiment sidebar", async () => {
        await navbar.openCreateExperimentSidebar();
    });

    await test.step("Set experiment name", async () => {
        await experimentsPage.createExperimentSidebar.setExperimentName(experimentName);
    });

    await test.step("Fill experiment setup form", async () => {
        await experimentsPage.setup.fillEmailForm(PROJECT, {
            averageOpenRate: 20,
            controlSubjectLine: "Random CSL",
            expectedAudienceSize: 50000,
            primaryGoal: "Open rate"
        });
    });

    await test.step("Cancel experiment creation", async () => {
        await experimentsPage.createExperimentSidebar.cancelButton.click();
    });

    await test.step("Assertion", async () => {
        await expect.soft(experimentsPage.noExperimentSelectedText).toBeVisible();
        await expect.soft(await experimentsPage.experimentListPanel.getExperimentInList(experimentName)).toHaveCount(0);
    });
});
