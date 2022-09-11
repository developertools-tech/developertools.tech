/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Home from '../pages/index';

// TODO: Test nav/etc

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByText(
      /Choose a tool from the menu to get started/i,
    );

    expect(heading).toBeInTheDocument();
  });
});
