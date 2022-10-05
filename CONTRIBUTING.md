# How to Contribute

This project is built with NextJS, TypeScript, and Material UI. Being a PWA, ideally all tools should work offline without any server side code.

Please create an issue before submitting a pull request, it can be assigned to you if desired. This way we can ensure your idea will be approved before you work on it. Any issue with the `triage` label is still pending review.

- Check the [issues](https://github.com/developertools-tech/developertools.tech/issues) page, any issue with the `help wanted` label is up for grabs.
- Create a [feature request or bug report](https://github.com/developertools-tech/developertools.tech/issues/new/choose).

### General Guidelines

- Please base your work on the `dev` branch, and make sure your pull request is submitted against the `dev` branch.
- Write tests for your tool or changes before submitting a PR.
- Run the code quality script locally before submitting a PR, and address any issues (`npm run cq`).
- Try to match the UI, style, and practices laid out in the existing tools.
- Prefer automatic execution on text entry over buttons when feasable, unless calculation is computationally expensive.
- Use `useLocalState` where appropriate to store values when the user leaves the page. Include the tool name in the local state key to prevent naming collisions.
- Add copy, paste, and clear buttons where appropriate to make the tools easy to use.
- Use the `Toast` component when a button or action does not otherwise indicate that anything happened (e.g. the copy button).
- Use the `useSupportsClipboardRead` hook to conditionally show a paste button, this feature is not supported on all browsers.

### Getting Started

First, fork this repository on GitHub, and clone your fork to your local machine.

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
  - `pages`
    - Create a page for your tool, note that the filename will be used as the page slug
  - `styles`
    - Create a directory for your tool if needed, but please stick with MUI styles as much as possible

### Basic Example

1. Take a look at some of the existing tools to see what tooling has already been built (e.g. toasts, local storage, window size, etc.)

2. Create the file `pages/your-tool-slug.tsx`

  ```tsx
  import React from 'react';

  import Heading from '../components/Heading';
  import Layout from '../components/Layout';

  export default function MyToolName() {
    return (
    <Layout title='My Tool Name'>
      <Heading>My Tool Name</Heading>
      {/* TODO - Build my tool */}
    </Layout>
    )
  }
  ```

3. Add your tool to the main navigation (`data/nav.ts`)

  ```ts
  //...
  import SomeIcon from '@mui/icons-material/SomeIcon';

  export default [
    // ...
    {
      title: 'My Tool Name',
      href: '/my-tool-slug',
      Icon: SomeIcon,
    },
  ];
  ```

## More Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Material UI](https://mui.com/material-ui) - learn about Material UI components and API.
- [Jest](https://jestjs.io/docs/getting-started) - learn about the Jest assertion library
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro) - learn about React Testing Library
