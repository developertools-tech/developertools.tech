/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Home from '../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByText(/Welcome/i);

    expect(heading).toBeInTheDocument();
  });

  it('renders the main navigation', () => {
    render(<Home />);

    const menu = screen.getByRole('navigation');
    expect(menu).toBeInTheDocument();

    const homeItem = screen.getByText(/Home/i);
    expect(homeItem).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<Home />);

    const footer = screen.getByText(/CopyLeft/i);
    expect(footer).toBeInTheDocument();
  });
});
