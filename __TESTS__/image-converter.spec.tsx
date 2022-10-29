/* eslint-disable import/no-extraneous-dependencies */
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ImageConverter from '../pages/image-converter';

describe('Image Converter', () => {
  it('renders without crashing', () => {
    render(<ImageConverter />);

    expect(screen.getByText(/uploadImage/i)).toBeInTheDocument();
  });

  it('an image can be uploaded and displayed', async () => {
    render(<ImageConverter />);

    expect(
      screen.queryByTestId('image-preview'),
    ).not.toBeInTheDocument();

    const file = new File(['abc'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('uploadImage');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByTestId('image-preview')).toBeInTheDocument();
    });
  });

  it('the type can be changed', async () => {
    render(<ImageConverter />);
    const user = userEvent.setup();

    const fileTypeControl: HTMLInputElement =
      screen.getByLabelText('png');
    expect(fileTypeControl.checked).toBe(false);
    await user.click(fileTypeControl);
    expect(fileTypeControl.checked).toBe(true);
  });
});
