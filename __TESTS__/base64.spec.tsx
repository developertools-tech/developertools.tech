/* eslint-disable import/no-extraneous-dependencies */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Base64 from '../pages/base64';
import renderWithI18n from './helper/i18n';

describe('Base64', () => {
  it('converts ASCII to Base64', async () => {
    const user = userEvent.setup();
    renderWithI18n(<Base64 />);

    const ascii = screen.getByLabelText(/ASCII/i);
    const base64 = screen.getByLabelText(/Base64/i);

    await user.clear(ascii);
    await user.type(ascii, 'Hello, world!');
    expect(base64).toHaveValue('SGVsbG8sIHdvcmxkIQ==');
  });

  it('converts Base64 to ASCII', async () => {
    const user = userEvent.setup();
    renderWithI18n(<Base64 />);

    const ascii = screen.getByLabelText(/ASCII/i);
    const base64 = screen.getByLabelText(/Base64/i);

    await user.clear(base64);
    await user.type(base64, 'dGVzdCBwYXNzZWQ=');
    expect(ascii).toHaveValue('test passed');
  });

  it('clears inputs with either clear button', async () => {
    const user = userEvent.setup();
    renderWithI18n(<Base64 />);

    const ascii = screen.getByLabelText(/ASCII/i);
    const base64 = screen.getByLabelText(/Base64/i);
    const clearBtns = screen.getAllByRole('button', { name: /Clear/i });

    await user.clear(ascii);
    await user.type(ascii, 'Hello, world!');
    await user.click(clearBtns[0]);

    expect(ascii).toHaveValue('');
    expect(base64).toHaveValue('');

    await user.type(ascii, 'Hello, world!');
    await user.click(clearBtns[1]);

    expect(ascii).toHaveValue('');
    expect(base64).toHaveValue('');
  });

  it('copies text to clipboard', async () => {
    const user = userEvent.setup();
    renderWithI18n(<Base64 />);

    const ascii = screen.getByLabelText(/ASCII/i);
    const copyBtns = screen.getAllByRole('button', { name: /Copy/i });

    await user.clear(ascii);
    await user.type(ascii, 'Hello, world!');

    await user.click(copyBtns[0]);
    expect(await navigator.clipboard.readText()).toBe('Hello, world!');

    await user.click(copyBtns[1]);
    expect(await navigator.clipboard.readText()).toBe(
      'SGVsbG8sIHdvcmxkIQ==',
    );
  });
});
