/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Totp from '../pages/totp';

jest.mock('otpauth', () => ({
  ...jest.requireActual('otpauth'),
  Secret: {
    fromUTF8: jest.fn((val) => val),
  },
}));

describe('TOTP', () => {
  it('generates a URI', async () => {
    const user = userEvent.setup();
    render(<Totp />);

    const secretInput = screen.getByLabelText(/secretLabel/i);
    const uriInput = screen.getByLabelText(/uriLabel/i);

    await user.clear(secretInput);
    await user.type(secretInput, 'ThisIsATestSecret');

    expect(uriInput).toHaveValue(
      'otpauth://totp/DevTools:TOTPTest?issuer=DevTools&secret=THISISATESTSECRE&algorithm=SHA1&digits=6&period=30',
    );
  });

  it('generates a token', async () => {
    const user = userEvent.setup();
    render(<Totp />);

    const secretInput = screen.getByLabelText(/secretLabel/i);
    const tokenInput = screen.getByLabelText(/tokenLabel/i);

    await user.clear(secretInput);
    await user.type(secretInput, 'ThisIsATestSecret');

    expect(tokenInput.innerHTML).toEqual(
      expect.stringMatching(/[0-9]{6,6}/),
    );
  });

  it('clears inputs with clear button', async () => {
    const user = userEvent.setup();
    render(<Totp />);

    const secretInput = screen.getByLabelText(/secretLabel/i);
    const uriInput = screen.getByLabelText(/uriLabel/i);
    const tokenInput = screen.getByLabelText(/tokenLabel/i);
    const clearBtn = screen.getByRole('button', { name: /Clear/i });

    await user.clear(secretInput);
    await user.type(secretInput, 'ThisIsATestSecret');
    await user.click(clearBtn);

    expect(secretInput).toHaveValue('');
    expect(uriInput).toHaveValue('');
    expect(tokenInput).toHaveValue('');
  });
});
