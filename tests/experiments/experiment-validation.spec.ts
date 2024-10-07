import { expect } from "@playwright/test";

import test from "@lib/base-test";

test("Experiment with no name should show error", async ({ experimentsPage, navbar }) => {
    await test.step("Open create experiment sidebar", async () => {
        await navbar.openCreateExperimentSidebar();
    });

    await test.step("Set experiment name", async () => {
        await experimentsPage.createExperimentSidebar.setExperimentName("");
    });

    await test.step("Assertion", async () => {
        await expect.soft(experimentsPage.createExperimentSidebar.experimentNameInputNoNameErrorText).toBeVisible();
        await expect.soft(experimentsPage.nextButton).toBeDisabled();
    });
});

test("Experiment name character validation", async ({ experimentsPage, navbar }) => {
    const invalidCharacters = '!"£$%^&*()+=[]#{}~;\':@,./<>?"`¬|';

    await test.step("Open create experiment sidebar", async () => {
        await navbar.openCreateExperimentSidebar();
    });

    for (const char of [...invalidCharacters]) {
        await test.step(`Set experiment name - ${char}`, async () => {
            await experimentsPage.createExperimentSidebar.experimentNameInput.fill(invalidCharacters);
            await expect.soft(experimentsPage.createExperimentSidebar.experimentNameInputInvalidCharactersErrorText).toBeVisible();
        });
    }

    await test.step("Assertion", async () => {
        await expect.soft(experimentsPage.createExperimentSidebar.experimentNameInput).toBeEmpty();
    });
});

test("Experiment name length validation", async ({ experimentsPage, navbar }) => {
    await test.step("Open create experiment sidebar", async () => {
        await navbar.openCreateExperimentSidebar();
    });

    await test.step(`Set experiment name`, async () => {
        await experimentsPage.createExperimentSidebar.experimentNameInput.fill("a".repeat(129));
    });

    await test.step("Assertion", async () => {
        await expect.soft(experimentsPage.createExperimentSidebar.experimentNameInputMaxLengthErrorText).toBeVisible();
    });
});
