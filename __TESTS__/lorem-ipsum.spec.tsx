/* eslint-disable import/no-extraneous-dependencies */
import { screen } from '@testing-library/react';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import LoremIpsum from '../pages/lorem-ipsum';
import renderWithI18n from './helper/i18n';

describe('Base64', () => {
  it('Displays Lorem Ipsum Text', async () => {
    renderWithI18n(<LoremIpsum />);

    const field = screen.getByTestId('lorem-ipsum-text');
    const fieldLength = field.textContent?.length;

    expect(fieldLength).toBeGreaterThan(10);
  });
});
