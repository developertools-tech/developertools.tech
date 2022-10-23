# How to Contribute

This project is built with NextJS, TypeScript, and Material UI. Being a PWA, ideally all tools should work offline without any server side code.

Please do not start working on something until you have an issue assigned to you. If you see an issue you want to work on, please add a comment asking for it to be assigned to you. If there is no issue, please create one first and request that it be assigned to you. Following this protocol will ensure that nobody wastes their valuable time and effort.

- Check the [open issues](https://github.com/developertools-tech/developertools.tech/issues).
  - Any issue with the ["triage"](https://github.com/developertools-tech/developertools.tech/labels/triage) label is pending review and not ready to be worked on or claimed.
  - Any issue with the ["help wanted"](https://github.com/developertools-tech/developertools.tech/labels/help%20wanted) label is ready to be claimed, feel free to add a comment requesting that it be assigned to you.
  - Any issue with the ["discussion"](https://github.com/developertools-tech/developertools.tech/labels/discussion) label is and open discussion, please feel free to add your thoughts.
- Create a [feature request or bug report](https://github.com/developertools-tech/developertools.tech/issues/new/choose).

### General Guidelines

- Please base your work on the `dev` branch, and make sure your pull request is submitted against the `dev` branch.
  - If needed, the `dev` branch branch is hosted at [dev.developertools.tech](https://dev.developertools.tech).
- Write tests for your tool or changes before submitting a PR.
- Try to match the UI, style, and practices laid out in the existing tools.
- Prefer automatic execution on text entry over buttons when feasable, unless calculation is computationally expensive.
- Use `useLocalState` where appropriate to store values when the user leaves the page. Include the tool name in the local state key to prevent naming collisions.
- Add copy, paste, and clear buttons where appropriate to make the tools easy to use.
- Use the `Toast` component when a button or action does not otherwise indicate that anything happened (e.g. the copy button).
- Use the `useSupportsClipboardRead` hook to conditionally show a paste button, this feature is not supported on all browsers.

### Getting Started

First, fork this repository on GitHub, and clone your fork to your local machine.

Checkout the `dev` branch to base your work on:

```sh
git checkout dev
```

Create a branch for your work:

```sh
git checkout -b my_branch_name
```

Set the upstream for your fork:

```sh
git push -u origin my_branch_name
```

Install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> **Note** this project includes a `devcontainer` configuration, so it's possible to contribute and do development work in both GitHub Codespaces as well as VS Code Dev Containers.

### Project Structure

- Project Root
  - `__TESTS__`
    - Create a file for testing your tool (required)
  - `components`
    - Create a directory here for your tool if needed
  - `data`
    - `nav.ts`
      - Add your tool to this file to include it in the main navigation
  - `hooks`
    - Create a directory for your tool if needed, unless it is a generic/re-usable hook
  - `i18n`
    - Translations, organized by language code
  - `pages`
    - Create a page for your tool, note that the filename will be used as the page slug
  - `styles`
    - Create a directory for your tool if needed, but please stick with MUI styles as much as possible

### Basic Example

1. Take a look at some of the existing tools to see what tooling has already been built (e.g. toasts, local storage, window size, etc.)

2. Create a translation namespace for your tool in `i18n/en/myToolName.json`, add an entry for any hard-coded text as you work on your tool

    ```json
    {
      "title": "My Tool Name",
      // ...
    }
    ```

3. Add your namespace to `i18n.ts`

    ```ts
    // ...
    import myToolName from '../i18n/en/myToolName.json';

    export const resources = {
      en: {
        // ...
        myToolName,
      }
    } as const;
    ```

4. Create the file `pages/your-tool-slug.tsx`

    ```tsx
    import React from 'react';
    import { Namespace, useTranslation } from 'react-i18next';

    import nextI18NextConfig from '../next-i18next.config.js';
    import Heading from '../components/Heading';
    import Layout from '../components/Layout';

    export default function MyToolName() {
      const { t } = useTranslation('myToolName');

      return (
      <Layout title={t('title')}>
        <Heading>{t('title')}</Heading>
        {/* TODO - Build my tool */}
      </Layout>
      )
    }

    const i18nextNameSpaces: Namespace[] = ['common', 'myToolName'];

    export const getStaticProps: GetStaticProps = async ({ locale }) => {
      const translation = await serverSideTranslations(
        locale || 'en',
        i18nextNameSpaces as string[],
        nextI18NextConfig,
      );
      return {
        props: { ...translation },
      };
    };

    ```

5. Add your tool name to the common namespace (`i18n/en/common.json`)

    ```json
    {
      // ...
      "myToolName": "My Tool Name",
    }
    ```

6. Add your tool to the main navigation (`data/nav.ts`)

    ```ts
    //...
    import SomeIcon from '@mui/icons-material/SomeIcon';

    export default [
      // ...
      {
        title: 'myToolName', // This is the translation key from the common namespace
        href: '/my-tool-slug',
        Icon: SomeIcon,
      },
    ];
    ```

### Code quality

#### Linting

This project uses [husky](https://github.com/typicode/husky) to run [ESLint](https://eslint.org/docs/latest/) and [Prettier](https://prettier.io/) on every commit. If there is an issue in the files you are committing, you may see a message like this:

```
$ git commit -m "feat: update regex component"

✔ Preparing lint-staged...
❯ Running tasks for staged files...
  ❯ .lintstagedrc — 1 file
    ❯ *.{js,jsx,ts,tsx} — 1 file
      ✖ eslint --fix [FAILED]
      ◼ prettier --write
↓ Skipped because of errors from tasks. [SKIPPED]
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

✖ eslint --fix:

/workspaces/developertools.tech/components/regex/RegexTestCase.tsx
  82:3  error  Unexpected console statement  no-console

✖ 1 problem (1 error, 0 warnings)

husky - pre-commit hook exited with code 1 (error)
```

Fix the highlighted errors, `git add` your files, and try again. You can manually run ESLint for the entire project with `npm run lint`.

#### Tests

You must write tests for your tool or changes before submitting a PR. Running `npm test` will start [Jest](https://jestjs.io/docs/getting-started) in watch mode, allowing you to run only tests related to files changed since the last commit.

You can run all the tests in the project with `npm run test:ci`. Github Actions will run them for you once you submit your PR, so this is not required.

## Internationalization (i18n)

This App is internationalized. This section describes the addition of translations.

### Add translation file (namespace)

Translation JSON files should be added to the `i18n/{en, ja, ..etc}/{PageName}.json`

Import the JSON file in `i18n.ts` and add it to the `resources.en` object

### Use translation

1. Add `getStaticProps` to the page
2. Utilize the `UseTranslation` hook
3. Get translated string values from the `t` function

Please refer to [the base64 tool](https://github.com/developertools-tech/developertools.tech/blob/main/pages/base64.tsx) as an example

### Add a language

Adding a language does not require adding every translation for the entire app, missing translations will fall back to english.

1. See [Getting Started](#getting-started) to create a fork and a new branch based on the `dev` branch
2. Create a directory at `i18n/{short-language-code}/`, use [language codes](https://www.science.co.il/language/Locale-codes.php) here
3. Create the namespace JSON files to match the `en` directory
4. Add the translated text to each namespace file
5. Add the locale to `next-i18next.config.js`
6. Create a pull request against the `dev` branch on GitHub

    ```js
    module.exports = {
      i18n: {
        // ...
        locales: ['en', 'ja', 'YOUR_LOCALE_HERE'],
      },
      // ...
    };
    ```

## More Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Material UI](https://mui.com/material-ui) - learn about Material UI components and API.
- [Jest](https://jestjs.io/docs/getting-started) - learn about the Jest assertion library
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro) - learn about React Testing Library
- [next-i18next](https://github.com/i18next/next-i18next) - learn about next-i18next
