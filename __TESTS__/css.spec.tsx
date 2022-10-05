/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Css from '../pages/css';

describe('CSS', () => {
  it('formats CSS and adds newlines', async () => {
    const user = userEvent.setup();
    render(<Css />);

    const css = screen.getByLabelText(/^CSS$/i);
    const formattedCss = screen.getByLabelText(/FormattedCSS/i);

    await user.clear(css);
    await user.type(
      css,
      'body{background:#ffffff;}'.replace(/[{[]/g, '$&$&'),
    );
    expect(formattedCss.innerHTML).toContain('body {');
    expect(formattedCss.innerHTML).toContain('background: #ffffff;');
    expect(formattedCss.innerHTML).toContain('\n');
  });

  it('clears inputs with either clear button', async () => {
    const user = userEvent.setup();
    render(<Css />);

    const css = screen.getByLabelText(/^CSS$/i);
    const formattedCss = screen.getByLabelText(/FormattedCSS/i);

    const clearBtns = screen.getAllByRole('button', { name: /Clear/i });

    await user.clear(css);
    await user.type(css, 'body{}'.replace(/[{[]/g, '$&$&'));
    await user.click(clearBtns[0]);

    expect(css).toHaveValue('');
    expect(formattedCss).toHaveValue('');

    await user.type(css, 'body{}'.replace(/[{[]/g, '$&$&'));
    await user.click(clearBtns[1]);

    expect(css).toHaveValue('');
    expect(formattedCss).toHaveValue('');
  });
});
