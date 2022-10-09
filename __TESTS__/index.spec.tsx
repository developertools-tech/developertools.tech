/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, screen } from '@testing-library/react';
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

    const search = screen.getByPlaceholderText(
      'Search...',
    ) as HTMLInputElement;
    expect(search).toBeInTheDocument();
    fireEvent.change(search, { target: { value: 'a' } });
    expect(search.value).toBe('a');

    const searchResults = Array.from(menu.childNodes || []);
    searchResults?.shift();
    searchResults?.forEach((element) => {
      expect(
        element.childNodes[0].childNodes[1].childNodes[0].textContent,
      ).toContain('a');
    });

    const homeItem = screen.getByText(/Home/i);
    expect(homeItem).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<Home />);

    const footer = screen.getByText(/CopyLeft/i);
    expect(footer).toBeInTheDocument();
  });
});
