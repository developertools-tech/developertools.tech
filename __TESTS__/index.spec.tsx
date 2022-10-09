/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('handles search queries in nav', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const search = screen.getByPlaceholderText('Search...');

    await user.clear(search);
    await user.type(search, 'a');

    const { getByText, queryByText } = within(
      screen.getByRole('navigation'),
    );

    expect(getByText(/Aspect Ratio/i)).toBeVisible();
    expect(getByText(/Base64/i)).toBeVisible();
    expect(queryByText(/HTML/i)).not.toBeInTheDocument();
    expect(queryByText(/JSON/i)).not.toBeInTheDocument();

    await user.clear(search);

    expect(getByText(/Home/i)).toBeVisible();
    expect(queryByText(/Aspect Ratio/i)).toBeVisible();
    expect(queryByText(/Base64/i)).toBeVisible();
    expect(queryByText(/HTML/i)).toBeVisible();

    await user.type(search, 'json');

    expect(getByText(/JSON/i)).toBeVisible();
    expect(queryByText(/HTML/i)).not.toBeInTheDocument();
    expect(queryByText(/Aspect Ratio/i)).not.toBeInTheDocument();
    expect(queryByText(/Base64/i)).not.toBeInTheDocument();
  });

  it('shows search and home as the top two nav items', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const search = screen.getByPlaceholderText('Search...');
    await user.clear(search);

    const nav = screen.getByRole('navigation');

    const { getAllByRole } = within(nav);

    const navItems = getAllByRole('listitem');
    const { getByLabelText } = within(navItems[0]);

    const navLinks = getAllByRole('link');
    const { getByText } = within(navLinks[0]);

    expect(getByLabelText(/Search Tools/i)).toBeVisible();
    expect(getByText(/Home/i)).toBeVisible();

    await user.type(search, 'o');

    expect(getByLabelText(/Search Tools/i)).toBeVisible();
    expect(getByText(/Home/i)).toBeVisible();
  });

  it('renders the footer', () => {
    render(<Home />);

    const footer = screen.getByText(/CopyLeft/i);
    expect(footer).toBeInTheDocument();
  });
});
