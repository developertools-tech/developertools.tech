/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Home from '../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByText(/welcome/i);

    expect(heading).toBeInTheDocument();
  });

  it('renders the main navigation', () => {
    render(<Home />);

    const menu = screen.getByRole('navigation');
    expect(menu).toBeInTheDocument();

    const homeItem = screen.getByText(/home/i);
    expect(homeItem).toBeInTheDocument();
  });

  it('handles search queries in nav', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const search = screen.getByPlaceholderText('search');

    await user.clear(search);
    await user.type(search, 'a');

    const { getByText, queryByText } = within(
      screen.getByRole('navigation'),
    );

    expect(getByText(/aspectRatio/i)).toBeVisible();
    expect(getByText(/base64/i)).toBeVisible();
    expect(queryByText(/^html$/i)).not.toBeInTheDocument();
    expect(queryByText(/json/i)).not.toBeInTheDocument();

    await user.clear(search);

    expect(getByText(/home/i)).toBeVisible();
    expect(queryByText(/aspectRatio/i)).toBeVisible();
    expect(queryByText(/base64/i)).toBeVisible();
    expect(queryByText(/^html$/i)).toBeVisible();

    await user.type(search, 'json');

    expect(getByText(/json/i)).toBeVisible();
    expect(queryByText(/html/i)).not.toBeInTheDocument();
    expect(queryByText(/aspectRatio/i)).not.toBeInTheDocument();
    expect(queryByText(/base64/i)).not.toBeInTheDocument();
  });

  it('shows search and home as the top two nav items', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const search = screen.getByPlaceholderText('search');
    await user.clear(search);

    const nav = screen.getByRole('navigation');

    const { getAllByRole } = within(nav);

    const navItems = getAllByRole('listitem');
    const { getByLabelText } = within(navItems[0]);

    const navLinks = getAllByRole('link');
    const { getByText } = within(navLinks[0]);

    expect(getByLabelText(/searchTools/i)).toBeVisible();
    expect(getByText(/home/i)).toBeVisible();

    await user.type(search, 'o');

    expect(getByLabelText(/searchTools/i)).toBeVisible();
    expect(getByText(/home/i)).toBeVisible();
  });

  it('renders the footer', () => {
    render(<Home />);

    const footer = screen.getByText(/CopyLeft/i);
    expect(footer).toBeInTheDocument();
  });
});
