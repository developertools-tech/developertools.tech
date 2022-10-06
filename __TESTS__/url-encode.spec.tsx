/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import URLEncodeDecode from '../pages/url-encode';

describe('URLEncodeDecode', () => {
  it('should encode and decode', () => {
    render(<URLEncodeDecode />);

    const encodedOutput = screen.getByLabelText(
      'Encoded',
    ) as HTMLInputElement;
    userEvent
      .type(encodedOutput, 'https%3A%2F%2Fexample.com')
      .then(() => {
        const decodedOutput = screen.getByLabelText('Decoded');
        expect(decodedOutput.innerText).toBe('https://example.com');
      });

    const decodedOutput = screen.getByLabelText(
      'Decoded',
    ) as HTMLInputElement;
    userEvent.type(decodedOutput, 'https://example2.com').then(() => {
      const encodedOutput2 = screen.getByLabelText('Encoded');
      expect(encodedOutput2.innerText).toBe(
        'https%3A%2F%2Fexample2.com',
      );
    });
  });
});
