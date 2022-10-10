/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import TextDiff from '../pages/text-diff';

describe('TextDiff', () => {
  it('Shows different characters', async () => {
    const testInput1 = 'I am the Lorax';
    const testInput2 = 'I speak for the trees';
    const testOutput =
      '<span style="color:grey">I </span><span style="color:green">spe</span><span style="color:grey">a</span><span style="color:red">m</span><span style="color:green">k</span><span style="color:grey"> </span><span style="color:green">for </span><span style="color:grey">the </span><span style="color:red">Lo</span><span style="color:green">t</span><span style="color:grey">r</span><span style="color:red">ax</span><span style="color:green">ees</span>';
    const user = userEvent.setup();
    render(<TextDiff />);

    const input1 = screen.getByLabelText(/Text 1/i);
    const input2 = screen.getByLabelText(/Text 2/i);
    const output = screen.getByTestId('text-difference-output');

    await user.clear(input1);
    await user.clear(input2);
    await user.type(input1, testInput1);
    await user.type(input2, testInput2);

    expect(output.innerHTML).toBe(testOutput);
  });

  it('Show different characters ignoring case', async () => {
    const randomCase = (str: string): string =>
      str
        .split('')
        .map((character) =>
          Math.round(Math.random()) === 0
            ? character.toLowerCase()
            : character.toUpperCase(),
        )
        .join();

    userEvent.selectOptions(
      // screen.getByLabelText(/diff-select-label/i),
      screen.getByTestId('text-difference-options'),
      ['Characters Ignore Case'],
    );

    const testInput1 = 'I am the Lorax';
    const testInput2 = 'I speak for the trees';
    const testOutput =
      '<span style="color:grey">I </span><span style="color:green">spe</span><span style="color:grey">a</span><span style="color:red">m</span><span style="color:green">k</span><span style="color:grey"> </span><span style="color:green">for </span><span style="color:grey">the </span><span style="color:red">Lo</span><span style="color:green">t</span><span style="color:grey">r</span><span style="color:red">ax</span><span style="color:green">ees</span>';
    const user = userEvent.setup();
    render(<TextDiff />);

    const input1 = screen.getByLabelText(/Text 1/i);
    const input2 = screen.getByLabelText(/Text 2/i);
    const output = screen.getByTestId('text-difference-output');

    await user.clear(input1);
    await user.clear(input2);
    await user.type(input1, randomCase(testInput1));
    await user.type(input2, randomCase(testInput2));

    expect(output.innerHTML).toBe(testOutput);
  });
});
