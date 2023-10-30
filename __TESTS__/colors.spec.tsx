/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Colors from '../pages/colors';

describe('Colors', () => {
  it('reacts to HEX change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const hex = screen.getByLabelText('colors:hex');
    const hsl = screen.getByLabelText('colors:hsl');
    const rgb = screen.getByLabelText('colors:rgb');

    await user.clear(hex);
    await user.type(hex, '232c34');
    expect(hex).toHaveValue('232c34');
    expect(hsl).toHaveValue('212, 17, 17');
    expect(rgb).toHaveValue('36, 43, 51');
  });

  it('reacts to HSL change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const hex = screen.getByLabelText('colors:hex');
    const hsl = screen.getByLabelText('colors:hsl');
    const rgb = screen.getByLabelText('colors:rgb');

    await user.clear(hsl);
    await user.type(hsl, '39, 24, 52');
    expect(hsl).toHaveValue('39, 24, 52');
    expect(hex).toHaveValue('A28D67');
    expect(rgb).toHaveValue('162, 141, 103');
  });

  it('reacts to RGB change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const hex = screen.getByLabelText('colors:hex');
    const hsl = screen.getByLabelText('colors:hsl');
    const rgb = screen.getByLabelText('colors:rgb');

    await user.clear(rgb);
    await user.type(rgb, '201, 57, 123');
    expect(rgb).toHaveValue('201, 57, 123');
    expect(hsl).toHaveValue('333, 55, 51');
    expect(hex).toHaveValue('C9397B');
  });

  it('reacts to foreground color change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const fg = screen.getByLabelText('colors:foreground');

    await user.clear(fg);
    await user.type(fg, '232c34');
    expect(fg).toHaveValue('232c34');
  });

  it('reacts to background color change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const bg = screen.getByLabelText('colors:background');

    await user.clear(bg);
    await user.type(bg, '232c34');
    expect(bg).toHaveValue('232c34');
  });

  it('reacts to color swap correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const bg = screen.getByLabelText('colors:background');
    const fg = screen.getByLabelText('colors:foreground');
    const swap = screen.getByLabelText('colors:swapColors');

    await user.clear(fg);
    await user.clear(bg);
    await user.type(fg, '232c34');
    await user.type(bg, 'c9397b');
    await userEvent.click(swap);
    expect(fg).toHaveValue('c9397b');
    expect(bg).toHaveValue('232c34');
  });
});
