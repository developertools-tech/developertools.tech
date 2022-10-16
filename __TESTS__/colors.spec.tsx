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

    const hex = screen.getByLabelText('HEX');
    const hsl = screen.getByLabelText('HSL');
    const rgb = screen.getByLabelText('RGB');

    await user.clear(hex);
    await user.type(hex, '#000000');
    expect(hsl.innerHTML).toBe('0, 0, 0');
    expect(rgb.innerHTML).toBe('0, 0, 0');
  });
  it('reacts to HSL change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const hex = screen.getByLabelText('HEX');
    const hsl = screen.getByLabelText('HSL');
    const rgb = screen.getByLabelText('RGB');

    await user.clear(hex);
    await user.type(hsl, '0, 0, 0');
    expect(hex.innerHTML).toBe('#000000');
    expect(rgb.innerHTML).toBe('0, 0, 0');
  });
  it('reacts to RGB change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const hex = screen.getByLabelText('HEX');
    const hsl = screen.getByLabelText('HSL');
    const rgb = screen.getByLabelText('RGB');

    await user.clear(hex);
    await user.type(rgb, '0, 0, 0');
    expect(hsl.innerHTML).toBe('0, 0, 0');
    expect(hex.innerHTML).toBe('#000000');
  });
});
