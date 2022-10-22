/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Colors from '../pages/colors';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

describe('Colors', () => {
  it('reacts to HEX change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const hex = screen.getByLabelText('HEX');
    const hsl = screen.getByLabelText('HSL');
    const rgb = screen.getByLabelText('RGB');

    await user.clear(hex);
    await user.type(hex, '232c34');
    expect(hex).toHaveValue('232c34');
    expect(hsl).toHaveValue('212, 17, 17');
    expect(rgb).toHaveValue('36, 43, 51');
  });

  it('reacts to HSL change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const hex = screen.getByLabelText('HEX');
    const hsl = screen.getByLabelText('HSL');
    const rgb = screen.getByLabelText('RGB');

    await user.clear(hsl);
    await user.type(hsl, '39, 24, 52');
    expect(hsl).toHaveValue('39, 24, 52');
    expect(hex).toHaveValue('A28D67');
    expect(rgb).toHaveValue('162, 141, 103');
  });

  it('reacts to RGB change correctly', async () => {
    const user = userEvent.setup();
    render(<Colors />);

    const hex = screen.getByLabelText('HEX');
    const hsl = screen.getByLabelText('HSL');
    const rgb = screen.getByLabelText('RGB');

    await user.clear(rgb);
    await user.type(rgb, '201, 57, 123');
    expect(rgb).toHaveValue('201, 57, 123');
    expect(hsl).toHaveValue('333, 55, 51');
    expect(hex).toHaveValue('C9397B');
  });
});
