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
      'urlEncode:encoded',
    ) as HTMLInputElement;
    userEvent
      .type(encodedOutput, 'https%3A%2F%2Fexample.com')
      .then(() => {
        const decodedOutput = screen.getByLabelText(
          'urlEncode:decoded',
        );
        expect(decodedOutput.innerText).toBe('https://example.com');
      });

    const decodedOutput = screen.getByLabelText(
      'urlEncode:decoded',
    ) as HTMLInputElement;
    userEvent.type(decodedOutput, 'https://example2.com').then(() => {
      const encodedOutput2 = screen.getByLabelText('urlEncode:encoded');
      expect(encodedOutput2.innerText).toBe(
        'https%3A%2F%2Fexample2.com',
      );
    });
  });
  it('should detect invalid encoded text', () => {
    render(<URLEncodeDecode />);

    const encodedOutput = screen.getByLabelText(
      'urlEncode:encoded',
    ) as HTMLInputElement;
    userEvent
      .type(encodedOutput, 'https%3A%2F%2Fexample.com%')
      .then(() => {
        const errorMessage = screen.getByText('urlEncode:errorMsg');
        expect(errorMessage).toBeInTheDocument();
      });
  });
});
