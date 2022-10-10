/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import RegexTester from '../pages/regex';

describe('Regex Tester', () => {
  it('can add and remove test cases', async () => {
    render(<RegexTester />);
    const user = userEvent.setup();

    expect(screen.getAllByLabelText('Test case content')).toHaveLength(
      1,
    );

    await user.click(screen.getByText('Add test case'));

    expect(screen.getAllByLabelText('Test case content')).toHaveLength(
      2,
    );

    await user.click(screen.getAllByLabelText('Delete test case')[0]);

    expect(screen.getAllByLabelText('Test case content')).toHaveLength(
      1,
    );
  });

  it('can match a regular expression', async () => {
    render(<RegexTester />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Regex'), `\\d+`);
    await user.type(screen.getByTestId('editor-latitude'), `abc123`);

    expect(screen.getByTestId('match-result')).toHaveTextContent(
      'Full match: 123',
    );
  });

  it('can match a regular expression with groups', async () => {
    render(<RegexTester />);
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText('Regex'),
      `([[A-Z]{{3})(\\d{{3})`,
    );
    await user.type(screen.getByTestId('editor-latitude'), `ABC123`);

    expect(screen.getByTestId('match-result')).toHaveTextContent(
      'Full match: ABC123',
    );
    const matches = screen.getAllByTestId('match-group');
    expect(matches).toHaveLength(2);
    expect(matches[0]).toHaveTextContent('Group #1: ABC');
    expect(matches[1]).toHaveTextContent('Group #2: 123');
  });

  it('can match a regular expression with flags', async () => {
    render(<RegexTester />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Regex'), `\/\Dog\/i`);
    await user.type(screen.getByTestId('editor-latitude'), `dog`);

    expect(screen.getByTestId('match-result')).toHaveTextContent(
      'Full match: dog',
    );
  });

  it('shows all matches for global expressions', async () => {
    render(<RegexTester />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Regex'), `\/\\w+\/g`);
    await user.type(
      screen.getByTestId('editor-latitude'),
      `dog cat sheep`,
    );

    const matches = screen.getAllByTestId('match-result');
    expect(matches).toHaveLength(3);
    expect(matches[0]).toHaveTextContent('Full match: dog');
    expect(matches[1]).toHaveTextContent('Full match: cat');
    expect(matches[2]).toHaveTextContent('Full match: sheep');
  });
});
