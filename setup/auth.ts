import * as path from "path";

import setup from "@lib/base-test";

setup("authenticate", async ({ loginPage, page }) => {
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
    await page.context().storageState({ path: path.resolve(__dirname, "..", "test-data", "auth", "storage-state.json") });
});
