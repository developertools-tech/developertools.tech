/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
/* eslint-enable import/no-extraneous-dependencies */
import { validate, version } from 'uuid';

import UUID from '../pages/uuid';

describe('UUID', () => {
  it('shows the about section', () => {
    render(<UUID />);

    expect(screen.getByText(/About UUIDs/i)).toBeInTheDocument();
  });

  it('generates a valid v1 UUID', async () => {
    const user = userEvent.setup();
    render(<UUID />);

    const versionSelect = screen.getByLabelText(/UUID Version/i);
    await user.click(versionSelect);
    await user.click(
      screen.getByRole('option', { name: 'v1 (Pseudorandom)' }),
    );

    const output: HTMLInputElement =
      screen.getByLabelText('Generated UUID');

    const validated = validate(output.value);
    const versioned = version(output.value);

    expect(validated).toBe(true);
    expect(versioned).toBe(1);

    const old = output.value;
    await user.click(screen.getByRole('button', { name: 'New UUID' }));
    expect(output.value).not.toBe(old);
  });

  it('generates a valid v3 UUID', async () => {
    const user = userEvent.setup();
    render(<UUID />);

    const namespace = '3fa9646d-627b-43db-b8cb-98939a51b35d';
    const name = 'test version three';
    const namespaceOutput = '74c32544-5824-3700-9e54-92c68a08defd';

    const versionSelect = screen.getByLabelText(/UUID Version/i);
    await user.click(versionSelect);
    await user.click(
      screen.getByRole('option', { name: 'v3 (MD5 Hash)' }),
    );

    const namespaceInput = screen.getByLabelText(/Namespace UUID/i);
    const nameInput = screen.getByLabelText(/UUID Name/i);
    await user.type(namespaceInput, namespace);
    await user.type(nameInput, name);

    const output: HTMLInputElement =
      screen.getByLabelText('Generated UUID');

    const validated = validate(output.value);
    const versioned = version(output.value);

    expect(validated).toBe(true);
    expect(versioned).toBe(3);
    expect(output.value).toBe(namespaceOutput);
  });

  it('generates a valid v4 UUID', async () => {
    const user = userEvent.setup();
    render(<UUID />);

    const versionSelect = screen.getByLabelText(/UUID Version/i);
    await user.click(versionSelect);
    await user.click(
      screen.getByRole('option', { name: 'v4 (Random)' }),
    );

    const output: HTMLInputElement =
      screen.getByLabelText('Generated UUID');

    const validated = validate(output.value);
    const versioned = version(output.value);

    expect(validated).toBe(true);
    expect(versioned).toBe(4);

    const old = output.value;
    await user.click(screen.getByRole('button', { name: 'New UUID' }));
    expect(output.value).not.toBe(old);
  });

  it('generates a valid v5 UUID', async () => {
    const user = userEvent.setup();
    render(<UUID />);

    const name = 'test version five';
    const namespaceOutput = '5cdbc07f-e32e-55cf-9cc7-5619fbe1be53';

    const versionSelect = screen.getByLabelText(/UUID Version/i);
    await user.click(versionSelect);
    await user.click(
      screen.getByRole('option', { name: 'v5 (SHA-1 Hash)' }),
    );

    await user.click(screen.getByTestId('generate-uuid-clear-btn'));

    const namespaceSelect = screen.getByLabelText(/Namespace Type/i);
    await user.click(namespaceSelect);
    await user.click(screen.getByRole('option', { name: 'DNS' }));

    const nameInput = screen.getByLabelText(/UUID Name/i);
    await user.type(nameInput, name);

    const output: HTMLInputElement =
      screen.getByLabelText('Generated UUID');

    const validated = validate(output.value);
    const versioned = version(output.value);

    expect(validated).toBe(true);
    expect(versioned).toBe(5);
    expect(output.value).toBe(namespaceOutput);
  });

  it('copies to clipboard', async () => {
    const user = userEvent.setup();
    render(<UUID />);

    await user.click(screen.getByTestId('generate-uuid-clear-btn'));

    const namespace = '3fa9646d-627b-43db-b8cb-98939a51b35d';
    const name = 'test version three';
    const namespaceOutput = '74c32544-5824-3700-9e54-92c68a08defd';

    const versionSelect = screen.getByLabelText(/UUID Version/i);
    await user.click(versionSelect);
    await user.click(
      screen.getByRole('option', { name: 'v3 (MD5 Hash)' }),
    );

    const namespaceInput = screen.getByLabelText(/Namespace UUID/i);
    const nameInput = screen.getByLabelText(/UUID Name/i);
    await user.type(namespaceInput, namespace);
    await user.type(nameInput, name);

    const copyBtn = screen.getByRole('button', { name: 'Copy' });
    await user.click(copyBtn);

    expect(await navigator.clipboard.readText()).toBe(namespaceOutput);
  });

  it('properly validates UUIDs', async () => {
    const user = userEvent.setup();
    render(<UUID />);

    const input = 'fb1d5d8f-3c80-459d-b30e-d38bd9397a21';

    try {
      await user.click(screen.getByTestId('validate-uuid-clear-btn'));
    } catch (_e) {
      return;
    }

    await user.type(screen.getByLabelText(/UUID to Validate/i), input);

    expect(screen.getByText(/Valid UUID v4/i)).toBeInTheDocument();

    await user.click(screen.getByTestId('validate-uuid-clear-btn'));

    expect(screen.getByLabelText(/UUID to Validate/i)).toHaveValue('');
  });
});
