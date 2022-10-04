/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import URLEncodeDecode from '../pages/urlEncodeDecode';

describe('URLEncodeDecode', () => {
  it('should encode and decode', () => {
    render(<URLEncodeDecode />);

    const urlInput = screen.getByTestId('Text') as HTMLInputElement;
    const encodeButton = screen.getByRole('button', { name: 'Encode' });
    const decodeButton = screen.getByRole('button', { name: 'Decode' });
    userEvent.type(urlInput, 'https://example.com');
    userEvent.click(encodeButton).then(() => {
      const encodedOutput = screen.getByTestId('Output - Encoded');
      expect(encodedOutput).toHaveTextContent(
        'https%3A%2F%2Fexample.com',
      );
    });
    userEvent.type(urlInput, 'https%3A%2F%2Fexample.com').then(() => {
      userEvent.click(decodeButton).then(() => {
        const decodedOutput = screen.getByTestId('Output - Decoded');
        expect(decodedOutput.innerText).toBe('https://example.com');
      });
    });
  });
});
