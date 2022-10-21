/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import MarkDownPreview from '../pages/markdown';

const goodTestInput = `
  # This is a first header
  ## A second heading to be sure  
  This is just a paragraph  
  with a small linebreak inside
  - My first item
  - Second item
`;
const goodTestOutput = `<h1 id="this-is-a-first-header">This is a first header</h1>
<h2 id="a-second-heading-to-be-sure">A second heading to be sure</h2>
<p>  This is just a paragraph<br>  with a small linebreak inside</p>
<ul>
<li>My first item</li>
<li>Second item</li>
</ul>
`;

test('previews markdown correctly', async () => {
  render(<MarkDownPreview />);
  const input = screen.getByLabelText('Markdown');
  const output = screen.getByTestId('markdown-output');
  fireEvent.change(input, { target: { value: goodTestInput } });
  expect(output.innerHTML).toBe(goodTestOutput);
});
