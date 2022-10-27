/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import AspectRatio from '../pages/aspect-ratio';
import renderWithI18n from './helper/i18n';

describe('AspectRatio', () => {
  it('renders a preview of the correct aspect ratio', async () => {
    renderWithI18n(<AspectRatio />);
    const user = userEvent.setup();

    const width = screen.getByLabelText(/Source Width/i);
    const height = screen.getByLabelText(/Source Height/i);

    await user.clear(width);
    await user.type(width, '1024');
    await user.clear(height);
    await user.type(height, '768');

    expect(screen.getByText('4:3')).toBeVisible();
    expect(screen.getByTestId('ratio-preview')).toHaveStyle({
      width: '226px',
      height: '169.5px',
    });

    await user.clear(width);
    await user.type(width, '1920');
    await user.clear(height);
    await user.type(height, '3840');

    expect(screen.getByText('1:2')).toBeVisible();
    expect(screen.getByTestId('ratio-preview')).toHaveStyle({
      width: '113px',
      height: '226px',
    });
  });

  it('correctly adjusts target dimensions', async () => {
    renderWithI18n(<AspectRatio />);
    const user = userEvent.setup();

    const sourceWidth = screen.getByLabelText(/Source Width/i);
    const sourceHeight = screen.getByLabelText(/Source Height/i);
    const targetWidth = screen.getByLabelText(/Target Width/i);
    const targetHeight = screen.getByLabelText(/Target Height/i);

    await user.clear(sourceWidth);
    await user.type(sourceWidth, '1024');
    await user.clear(sourceHeight);
    await user.type(sourceHeight, '768');
    await user.clear(targetWidth);
    await user.type(targetWidth, '500');

    expect(targetHeight).toHaveValue('375');

    await user.clear(targetHeight);
    await user.type(targetHeight, '500');

    expect(targetWidth).toHaveValue('667');
  });

  it('generates an accurate table of layouts', async () => {
    renderWithI18n(<AspectRatio />);
    const user = userEvent.setup();

    const width = screen.getByLabelText(/Source Width/i);
    const height = screen.getByLabelText(/Source Height/i);
    const margin = screen.getByLabelText(/Margin Pixels/i);
    const gap = screen.getByLabelText(/Gap Pixels/i);
    const expand = screen.getByLabelText(/Expand Percent/i);
    const widths = screen.getAllByLabelText(/Screen Widths/i);
    const count = screen.getByLabelText(
      /Number of layouts to display/i,
    );

    await user.clear(width);
    await user.type(width, '524');
    await user.clear(height);
    await user.type(height, '412');

    expect(screen.getByText('360 x 283')).toBeVisible();
    expect(screen.getByText('960 x 755')).toBeVisible();
    expect(screen.getByText('512 x 403')).toBeVisible();
    expect(screen.getByText('213 x 167')).toBeVisible();

    await user.type(margin, '20');

    expect(screen.getByText('1900 x 1494')).toBeVisible();
    expect(screen.getByText('940 x 739')).toBeVisible();

    await user.type(gap, '15');

    expect(screen.getByText('1900 x 1494')).toBeVisible();
    expect(screen.getByText('925 x 727')).toBeVisible();

    await user.type(expand, '12');

    expect(screen.getByText('2128 x 1673')).toBeVisible();
    expect(screen.getByText('1036 x 815')).toBeVisible();

    fireEvent.change(count, { target: { value: '7' } });
    /* NOTE: Try to do this without fireEvent
    await user.click(count);
    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}');
    */

    expect(screen.getByText('184 x 145')).toBeVisible();

    await user.click(widths[0]);
    await user.click(screen.getByText('3840'));

    expect(screen.getByText('4278 x 3364')).toBeVisible();
  });
});
