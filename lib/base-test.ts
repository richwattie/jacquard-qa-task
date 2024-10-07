import { test } from "@playwright/test";

import { type PageFactoryFixtures, pageFactoryFixtures } from "@page-factory/fixtures";

type Fixtures = {
    initialise: void;
};

// noinspection JSUnusedGlobalSymbols
export default test.extend<Fixtures & PageFactoryFixtures>({
    // Add all common component and page fixtures.
    ...pageFactoryFixtures,

    // Initialises browser context and navigate to baseURL.
    initialise: [
        async ({ baseURL, page }, use) => {
            await page.goto(baseURL);
            await use();
        },
        { auto: true }
    ]
});
