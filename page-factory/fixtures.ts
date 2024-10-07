import { test } from "@playwright/test";

import { Navbar } from "@components/navbar";
import { ExperimentsPage } from "@pages/experiments/experiments-page";
import { LoginPage } from "@pages/login";

type CommonComponents = {
    navbar: Navbar;
};

type Pages = {
    experimentsPage: ExperimentsPage;
    loginPage: LoginPage;
};

export type PageFactoryFixtures = CommonComponents & Pages;

// noinspection JSUnusedGlobalSymbols
const commonComponentFixtures: Parameters<typeof test.extend<PageFactoryFixtures>>[0] = {
    navbar: async ({ page }, use): Promise<void> => use(new Navbar(page))
};

// noinspection JSUnusedGlobalSymbols
const pageFixtures: Parameters<typeof test.extend<PageFactoryFixtures>>[0] = {
    experimentsPage: async ({ page }, use): Promise<void> => use(new ExperimentsPage(page)),
    loginPage: async ({ page, navbar }, use): Promise<void> => use(new LoginPage(page, navbar))
};

export const pageFactoryFixtures = { ...commonComponentFixtures, ...pageFixtures };
