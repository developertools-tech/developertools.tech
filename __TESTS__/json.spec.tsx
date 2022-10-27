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

const badTestInput = `{\\{}
  "test": true,
  "item": {\\{}
    "thing": "yes",,
    "count": 20
  {\\}}
{\\}}`;

const badTestOutput = `{
  "test": true,
  "item": {
<span class="bad-line">    "thing": "yes",,</span>
    "count": 20
  }
}
`;

describe('JSON', () => {
  it('formats json', async () => {
    const user = userEvent.setup();
    render(<Json />);

    const input = screen.getByLabelText(/Input/i);
    const output = screen.getByTestId('json-output');

    await user.clear(input);
    await user.type(input, goodTestInput);

    expect(output.innerHTML).toBe(goodTestOutput);
  });

  it('detects invalid json', async () => {
    const user = userEvent.setup();
    render(<Json />);

    const input = screen.getByLabelText(/Input/i);
    const output = screen.getByTestId('json-output');
    const errorCont = screen.getByTestId('json-error');

    await user.clear(input);
    await user.type(input, badTestInput);
    expect(output.innerHTML).toBe(badTestOutput);
    expect(errorCont.innerHTML).toMatch(
      /Unexpected token , in JSON at position 49/i,
    );
  });

  it('clears inputs with clear buttons + shows placeholder', async () => {
    const user = userEvent.setup();
    render(<Json />);

    const input = screen.getByLabelText(/Input/i);
    const output = screen.getByTestId('json-output');
    const clearBtns = screen.getAllByRole('button', { name: /Clear/i });

    await user.clear(input);
    await user.type(input, goodTestInput);
    await user.click(clearBtns[0]);

    expect(input).toHaveValue('');
    expect(output.innerHTML).toBe(
      '<span class="placeholder">Output</span>',
    );

    await user.type(input, goodTestInput);
    await user.click(clearBtns[1]);

    expect(input).toHaveValue('');
    expect(output.innerHTML).toBe(
      '<span class="placeholder">Output</span>',
    );
  });

  it('copies text to clipboard', async () => {
    const user = userEvent.setup();
    render(<Json />);

    const input = screen.getByLabelText(/Input/i);
    const copyBtns = screen.getAllByRole('button', { name: /Copy/i });

    await user.clear(input);
    await user.type(input, goodTestInput);

    await user.click(copyBtns[0]);
    expect(await navigator.clipboard.readText()).toBe(
      goodTestInput.replaceAll('{\\{}', '{').replaceAll('{\\}}', '}'),
    );

    await user.click(copyBtns[1]);
    expect(await navigator.clipboard.readText()).toBe(goodTestOutput);
  });
});
