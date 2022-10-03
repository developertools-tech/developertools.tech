## Contributing

This project is built with NextJS, TypeScript, and Material UI. Being a PWA, ideally all tools should work offline without any server side code.

### Pull Requests

Pull requests are welcome, please base your work on the `dev` branch, and make sure your pull request is submitted against the `dev` branch.

### Getting Started

First, run the development server:

```bash
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

### Code Quality

Please use the script `npm run cq` before submitting a pull request.

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
      </Heading>
    </Layout>
    )
  }
  ```

3. Add your tool to the main navigation

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
