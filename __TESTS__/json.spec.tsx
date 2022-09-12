/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Json from '../pages/json';

const goodTestInput =
  '{\\{}"test":true,"item":{\\{}"thing":"yes","count":20{\\}}{\\}}';
const goodTestOutput = `{
  "test": true,
  "item": {
    "thing": "yes",
    "count": 20
  }
}`;

describe('Base64', () => {
  it('formats json', async () => {
    const user = userEvent.setup();
    render(<Json />);

    const input = screen.getByLabelText(/Input/i);
    const output = screen.getByTestId('json-output');

    await user.clear(input);
    await user.type(input, goodTestInput);

    expect(output.innerHTML).toBe(goodTestOutput);
  });

  // TODO: More tests

  /*
  it('converts Base64 to Input', async () => {
    const user = userEvent.setup();
    render(<Json />);

    const input = screen.getByLabelText(/Input/i);
    const base64 = screen.getByLabelText(/Base64/i);

    await user.clear(base64);
    await user.type(base64, 'dGVzdCBwYXNzZWQ=');
    expect(input).toHaveValue('test passed');
  });

  it('clears inputs with either clear button', async () => {
    const user = userEvent.setup();
    render(<Json />);

    const input = screen.getByLabelText(/Input/i);
    const clearBtns = screen.getAllByRole('button', { name: /Clear/i });

    await user.clear(input);
    await user.type(input, 'Hello, world!');
    await user.click(clearBtns[0]);

    expect(input).toHaveValue('');
    expect(base64).toHaveValue('');

    await user.type(input, 'Hello, world!');
    await user.click(clearBtns[1]);

    expect(input).toHaveValue('');
    expect(base64).toHaveValue('');
  });

  it('copies text to clipboard', async () => {
    const user = userEvent.setup();
    render(<Json />);

    const input = screen.getByLabelText(/Input/i);
    const copyBtns = screen.getAllByRole('button', { name: /Copy/i });

    await user.clear(input);
    await user.type(input, 'Hello, world!');

    await user.click(copyBtns[0]);
    expect(await navigator.clipboard.readText()).toBe('Hello, world!');

    await user.click(copyBtns[1]);
    expect(await navigator.clipboard.readText()).toBe(
      'SGVsbG8sIHdvcmxkIQ==',
    );
  });
  */
});
