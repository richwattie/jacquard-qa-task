import { devices, type PlaywrightTestConfig } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const config: PlaywrightTestConfig = {
    expect: {
        timeout: 10 * 1000
    },
    forbidOnly: !!process.env.CI,
    fullyParallel: true,
    outputDir: "test-results/",
    reporter: [["html", { outputFolder: "./reports", open: "never" }], ["junit", { outputFile: "./reports/results.xml" }], ["list"]],
    retries: process.env.CI ? 2 : 0,
    snapshotDir: "snapshots",
    timeout: 60 * 1000,
    workers: process.env.CI ? 1 : 3,

    use: {
        acceptDownloads: true,
        actionTimeout: 10 * 1000,
        baseURL: process.env.BASE_URL,
        ignoreHTTPSErrors: true,
        testIdAttribute: "data-cy",
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
        video: "retain-on-failure",
        viewport: { height: 1080, width: 1920 }
    },

    projects: [
        { name: "setup", testDir: "./setup", testMatch: /.*.ts/ },

        {
            name: "chromium",
            testDir: "./tests",
            use: {
                ...devices["Desktop Chrome"],
                storageState: path.resolve(__dirname, "test-data", "auth", "storage-state.json")
            },
            dependencies: ["setup"]
        }
    ]
};

// noinspection JSUnusedGlobalSymbols
export default config;
