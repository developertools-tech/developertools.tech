/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, screen } from '@testing-library/react';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import AspectRatio from '../pages/aspect-ratio';

describe('AspectRatio', () => {
  it('renders a preview of the correct aspect ratio', () => {
    render(<AspectRatio />);

    const width = screen.getByLabelText(/Source Width/i);
    const height = screen.getByLabelText(/Source Height/i);

    fireEvent.change(width, { target: { value: '1024' } });
    fireEvent.change(height, { target: { value: '768' } });
    expect(screen.getByText('4:3')).toBeVisible();
    expect(screen.getByTestId('ratio-preview')).toHaveStyle({
      width: '226px',
      height: '169.5px',
    });

    fireEvent.change(width, { target: { value: '1920' } });
    fireEvent.change(height, { target: { value: '3840' } });
    expect(screen.getByText('1:2')).toBeVisible();
    expect(screen.getByTestId('ratio-preview')).toHaveStyle({
      width: '113px',
      height: '226px',
    });
  });

  it('correctly adjusts target dimensions', () => {
    render(<AspectRatio />);

    const width = screen.getByLabelText(/Source Width/i);
    const height = screen.getByLabelText(/Source Height/i);
    const newWidth: HTMLInputElement =
      screen.getByLabelText(/Target Width/i);
    const newHeight: HTMLInputElement =
      screen.getByLabelText(/Target Height/i);

    fireEvent.change(width, { target: { value: '1024' } });
    fireEvent.change(height, { target: { value: '768' } });

    fireEvent.change(newWidth, { target: { value: '500' } });
    expect(newHeight.value).toBe('375');

    fireEvent.change(newHeight, { target: { value: '500' } });
    expect(newWidth.value).toBe('667');
  });
});
