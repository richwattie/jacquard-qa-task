# Table of contents

- [Project Overview](#project-overview)
  - [Installation](#Installation)
- [Environment Setup](#Environment-Setup)
- [Running Tests](#Running-Tests)
- [Reporting](#Reporting)
- [Future Progress](#Future-Progress)
  - [Additional Notes](#Additional-Notes)


# Project Overview

Automated tests for the Jacquard.

## Installation

1. Install [Node.js](https://nodejs.org/en/), version is mentioned in `.nvmrc`. The easiest way to maintain multiple node versions is using [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md)
    1. If you chose to use `nvm`, use `nvm install` and `nvm use` within the root directory to fetch and use the correct version
2. Install [Yarn](https://classic.yarnpkg.com/en/docs/install)
3. Run `yarn install` to download the projects dependencies
4. Run `npx playwright install chromium` to install Playwright Chromium browser
5. (Optional) Make sure you have your code editor configured to work with Eslint and Prettier. If you use VS Code please install [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

## Environment Setup

To run the tests you will need to create a .env file in the root directory.  
The file should contain the following variables...

| Variable | Value                            | Details                                                          |
| -------- | -------------------------------- | ---------------------------------------------------------------- |
| BASE_URL | `https://app-qa.jacquard.com/`   | The base url the web ui is running on                            |
| EMAIL    | `automation.user-b@jacquard.com` | Email address of the test user account                           |
| PASSWORD |                                  | Password of the test user account (You should already have this) |

# Running Tests

To run the tests, run...

```console
yarn test
```

# Reporting

To view the report run the following command. This will open a browser and serve the report.

```console
yarn report
```

The report will show all tests and their result. Passed tests contain no artifacts and simply displays the steps performed. Failed tests can be
interrogated further. We collect the following artifacts for failed tests...

-   A screenshot at the point of failure
-   A video of the test from start to finish
-   A trace report which details screenshots of each step performed along with sources information including console log and networking

# Future Progress

Given more time I would do the following...

-   Create a common function to select a date using the calendar element i.e. The send date on the language generation tab
-   Create a solution to make the tests clear down the created data at the end of the suite
-   Validate help text for input fields on each form
-   Check the created and send dates on the experiment list items
-   Check different number of splits and list the correct amount on the language approval tab
-   Work out what testing x splits of xxxx is and if that can be manually calculated to ensure it returns the correct values
-   Edit the experiment name after creation (or one that already exists)
-   After creating an experiment check the number of experiments increase...
    -   On the list of experiments
    -   On the homepage, "awaiting approval" experiments
-   Check To-Do's on the homepage shows newly created experiments and their current statuses
-   Check recent experiments on the homepage shows newly created experiments
-   Create an experiment by navigating to it from the 2 additional links on the homepage
-   Test that different filters return correct results
-   Check that making changes to an existing experiment without saving, then navigating away and back again does not save the changes
-   Check that saving changes made to an existing experiment, then navigating away and back again shows the new changes
-   Test various different combination of fields on the Language Generation form to ensure different options display different fields

## Additional Notes

-   It was mentioned that there was a recent rebranding from Phrasee to Jacquard. Some form fields have help text that reference Phrasee.
-   This is off-topic from the task, but I received a demographic survey email from Jacquard and the email signature also referenced Phrasee
