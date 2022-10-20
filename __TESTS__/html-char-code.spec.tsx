/* eslint-disable import/no-extraneous-dependencies */
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import HtmlCharCode from '../pages/html-char-codes';

const unescapedChars = '<>"\'&©∆';
const escapedChars = '&lt;&gt;&quot;&apos;&amp;&copy;&#8710;';

let user: UserEvent;
beforeEach(() => {
  user = userEvent.setup();
});

afterEach(() => {
  cleanup();
});

describe('HtmlCharCodes', () => {
  it('input unescaped', async () => {
    render(<HtmlCharCode />);
    const unescaped = screen.getByLabelText(/Unescaped/i);
    const escaped = screen.getByLabelText(/^Escaped/i);

    await user.clear(unescaped);
    await user.type(unescaped, unescapedChars);
    expect(escaped).toHaveValue(escapedChars);
  });

  it('input escaped', async () => {
    render(<HtmlCharCode />);
    const unescaped = screen.getByLabelText(/Unescaped/i);
    const escaped = screen.getByLabelText(/^Escaped/i);

    await user.clear(escaped);
    await user.type(escaped, escapedChars);
    expect(unescaped).toHaveValue(unescapedChars);
  });

  it('clears unescaped and escaped with clear button', async () => {
    render(<HtmlCharCode />);
    const unescaped = screen.getByLabelText(/Unescaped/i);
    const escaped = screen.getByLabelText(/^Escaped/i);

    await user.clear(unescaped);
    await user.type(unescaped, unescapedChars);
    expect(unescaped).not.toHaveValue('');
    expect(escaped).not.toHaveValue('');

    const clearButtons = screen.getAllByRole('button', {
      name: /Clear/i,
    });

    await user.click(clearButtons[0]);
    expect(unescaped).toHaveValue('');
    expect(escaped).toHaveValue('');

    // other clear button case
    await user.type(unescaped, unescapedChars);
    expect(unescaped).not.toHaveValue('');
    expect(escaped).not.toHaveValue('');

    await user.click(clearButtons[1]);
    expect(unescaped).toHaveValue('');
    expect(escaped).toHaveValue('');
  });

  it('copies text to clipboard', async () => {
    render(<HtmlCharCode />);
    const unescaped = screen.getByLabelText(/Unescaped/i);

    await user.clear(unescaped);
    await user.type(unescaped, unescapedChars);

    const copyButtons = screen.getAllByRole('button', {
      name: /Copy/i,
    });

    await user.click(copyButtons[0]);
    expect(await navigator.clipboard.readText()).toBe(unescapedChars);
    await user.click(copyButtons[1]);
    expect(await navigator.clipboard.readText()).toBe(escapedChars);
  });
});
