/* eslint-disable import/no-extraneous-dependencies */
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import HtmlCharCode from '../pages/html-char-codes';

const specialChars = '<>"\'&©∆';
const encodedChars = '&lt;&gt;&quot;&apos;&amp;&copy;&#8710;';

let user: UserEvent;
beforeEach(() => {
  user = userEvent.setup();
});

afterEach(() => {
  cleanup();
});

describe('HtmlCharCodes', () => {
  it('encode', async () => {
    render(<HtmlCharCode />);
    const input = screen.getByLabelText(/Input/i);
    const output = screen.getByLabelText(/Output/i);

    await user.clear(input);
    await user.type(input, specialChars);
    expect(output).toHaveValue(encodedChars);
  });

  it('decode', async () => {
    render(<HtmlCharCode />);
    const input = screen.getByLabelText(/Input/i);
    const output = screen.getByLabelText(/Output/i);

    await user.click(screen.getByRole('button', { name: /Mode .*/i }));
    await user.click(
      screen.getByRole('option', {
        name: 'Decode',
      }),
    );

    await user.click(input);
    await user.clear(input);
    await user.type(input, encodedChars);
    expect(output).toHaveValue(specialChars);
  });

  it('clears input and output with clear button', async () => {
    render(<HtmlCharCode />);
    const input = screen.getByLabelText(/Input/i);
    const output = screen.getByLabelText(/Output/i);

    await user.clear(input);
    await user.type(input, specialChars);
    expect(input).not.toHaveValue('');
    expect(output).not.toHaveValue('');

    const clearButton = screen.getByRole('button', {
      name: /Clear/i,
    });

    await user.click(clearButton);
    expect(input).toHaveValue('');
    expect(output).toHaveValue('');
  });

  it('copies text to clipboard', async () => {
    render(<HtmlCharCode />);
    const input = screen.getByLabelText(/Input/i);
    await user.click(screen.getByRole('button', { name: /Mode .*/i }));
    await user.click(
      screen.getByRole('option', {
        name: 'Encode',
      }),
    );

    await user.clear(input);
    await user.type(input, specialChars);

    const copyButton = screen.getByRole('button', {
      name: /Copy/i,
    });
    await user.click(copyButton);
    expect(await navigator.clipboard.readText()).toBe(encodedChars);
  });
});
