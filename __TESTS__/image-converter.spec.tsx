/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ImageConverter from '../pages/image-converter';
import renderWithI18n from './helper/i18n';

describe('Image Converter', () => {
  it('renders without crashing', () => {
    renderWithI18n(<ImageConverter />);

    expect(screen.getByText(/Upload image/i)).toBeInTheDocument();
  });

  it('an image can be uploaded and displayed', async () => {
    renderWithI18n(<ImageConverter />);

    expect(
      screen.queryByTestId('image-preview'),
    ).not.toBeInTheDocument();

    const file = new File(['abc'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('Upload Image');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByTestId('image-preview')).toBeInTheDocument();
    });
  });

  it('the type can be changed', async () => {
    renderWithI18n(<ImageConverter />);
    const user = userEvent.setup();

    const fileTypeControl: HTMLInputElement =
      screen.getByLabelText('PNG');
    expect(fileTypeControl.checked).toBe(false);
    await user.click(fileTypeControl);
    expect(fileTypeControl.checked).toBe(true);
  });
});
