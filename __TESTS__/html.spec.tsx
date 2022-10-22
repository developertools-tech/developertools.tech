/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Html from '../pages/html';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

describe('HTML', () => {
  it('formats HTML and adds newlines', async () => {
    const user = userEvent.setup();
    render(<Html />);

    const html = screen.getByLabelText(/^HTML$/i);
    const formattedHtml = screen.getByLabelText(/FormattedHTML/i);

    await user.clear(html);
    await user.type(html, '<html><body>');
    expect(formattedHtml.innerHTML).toContain('&lt;/html&gt;');
    expect(formattedHtml.innerHTML).toContain('\n');
  });

  it('clears inputs with either clear button', async () => {
    const user = userEvent.setup();
    render(<Html />);

    const html = screen.getByLabelText(/^HTML$/i);
    const formattedHtml = screen.getByLabelText(/FormattedHTML/i);

    const clearBtns = screen.getAllByRole('button', { name: /Clear/i });

    await user.clear(html);
    await user.type(html, '<html>');
    await user.click(clearBtns[0]);

    expect(html).toHaveValue('');
    expect(formattedHtml).toHaveValue('');

    await user.type(html, '<html>');
    await user.click(clearBtns[1]);

    expect(html).toHaveValue('');
    expect(formattedHtml).toHaveValue('');
  });
});
