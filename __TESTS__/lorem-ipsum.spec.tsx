/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import LoremIpsum from '../pages/lorem-ipsum';

describe('Base64', () => {
  it('Displays Lorem Ipsum Text', async () => {
    render(<LoremIpsum />);

    const field = screen.getByTestId('lorem-ipsum-text');
    const fieldLength = field.textContent?.length;

    expect(fieldLength).toBeGreaterThan(10);
  });
});
