/* eslint-disable import/no-extraneous-dependencies */
import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import TextDiff from '../pages/text-diff';

const testInput1 = 'I am the Lorax';
const testInput2 = 'I speak for the trees';
const testOutput =
  '<span style="color:grey">I </span><span style="color:green">spe</span><span style="color:grey">a</span><span style="color:red">m</span><span style="color:green">k</span><span style="color:grey"> </span><span style="color:green">for </span><span style="color:grey">the </span><span style="color:red">Lo</span><span style="color:green">t</span><span style="color:grey">r</span><span style="color:red">ax</span><span style="color:green">ees</span>';

describe('TextDiff', () => {
  it('Shows different characters', async () => {
    const user = userEvent.setup();
    render(<TextDiff />);

    const selectedOption = 'Characters';

    fireEvent.mouseDown(screen.getByLabelText(/Choose Diff Options/i));
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(selectedOption));
    const inputBox = screen.getByTestId('text-difference-options');
    expect(inputBox).toHaveValue(selectedOption);

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
        .join('');

    const user = userEvent.setup();
    render(<TextDiff />);

    const selectedOption = 'Characters Ignore Case';
    fireEvent.mouseDown(screen.getByLabelText(/Choose Diff Options/i));
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(selectedOption));
    const inputBox = screen.getByTestId('text-difference-options');
    expect(inputBox).toHaveValue(selectedOption);

    const input1 = screen.getByLabelText(/Text 1/i);
    const input2 = screen.getByLabelText(/Text 2/i);
    const output = screen.getByTestId('text-difference-output');

    const testInput = 'This is some random text for testing';
    const testInputT1 = randomCase(testInput);
    const testInputT2 = randomCase(testInput);
    const testOutputLocal = `<span style="color:grey">${testInputT2}</span>`;

    await user.clear(input1);
    await user.clear(input2);
    await user.type(input1, testInputT1);
    await user.type(input2, testInputT2);

    expect(output.innerHTML).toBe(testOutputLocal);
  });

  it('Show different words', async () => {
    const user = userEvent.setup();
    render(<TextDiff />);

    const selectedOption = 'Words';
    fireEvent.mouseDown(screen.getByLabelText(/Choose Diff Options/i));
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(selectedOption));

    const inputBox = screen.getByTestId('text-difference-options');
    expect(inputBox).toHaveValue(selectedOption);

    const input1 = screen.getByLabelText(/Text 1/i);
    const input2 = screen.getByLabelText(/Text 2/i);
    const output = screen.getByTestId('text-difference-output');

    const testInputT1 = 'I am some teXt for Testing';
    const testInputT2 = 'I too AM some text for Testing';
    const testOutputLocal =
      '<span style="color:grey">I </span><span style="color:red">am</span><span style="color:green">too</span><span style="color:grey"> </span><span style="color:green">AM </span><span style="color:grey">some </span><span style="color:red">teXt</span><span style="color:green">text</span><span style="color:grey"> for Testing</span>';

    await user.clear(input1);
    await user.clear(input2);
    await user.type(input1, testInputT1);
    await user.type(input2, testInputT2);

    expect(output.innerHTML).toBe(testOutputLocal);
  });

  it('Show different words ignoring case', async () => {
    const user = userEvent.setup();
    render(<TextDiff />);

    const selectedOption = 'Words Ignore Case';
    fireEvent.mouseDown(screen.getByLabelText(/Choose Diff Options/i));
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(selectedOption));

    const inputBox = screen.getByTestId('text-difference-options');
    expect(inputBox).toHaveValue(selectedOption);

    const input1 = screen.getByLabelText(/Text 1/i);
    const input2 = screen.getByLabelText(/Text 2/i);
    const output = screen.getByTestId('text-difference-output');

    const testInputT1 = 'I am some teXt for Testing';
    const testInputT2 = 'I too AM some text for Testing';
    const testOutputLocal =
      '<span style="color:grey">I </span><span style="color:green">too </span><span style="color:grey">AM some text for Testing</span>';

    await user.clear(input1);
    await user.clear(input2);
    await user.type(input1, testInputT1);
    await user.type(input2, testInputT2);

    expect(output.innerHTML).toBe(testOutputLocal);
  });

  it('Show different words treating whitespace as significant', async () => {
    const user = userEvent.setup();
    render(<TextDiff />);

    const selectedOption = 'Words with Space';
    fireEvent.mouseDown(screen.getByLabelText(/Choose Diff Options/i));
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(selectedOption));

    const inputBox = screen.getByTestId('text-difference-options');
    expect(inputBox).toHaveValue(selectedOption);

    const input1 = screen.getByLabelText(/Text 1/i);
    const input2 = screen.getByLabelText(/Text 2/i);
    const output = screen.getByTestId('text-difference-output');

    const testInputT1 = 'I am s ome text for Testing';
    const testInputT2 = 'I too AM some textfor Testing';
    const testOutputLocal =
      '<span style="color:grey">I </span><span style="color:red">am</span><span style="color:green">too</span><span style="color:grey"> </span><span style="color:red">s</span><span style="color:green">AM</span><span style="color:grey"> </span><span style="color:red">ome</span><span style="color:green">some</span><span style="color:grey"> </span><span style="color:red">text</span><span style="color:green">textfor</span><span style="color:grey"> </span><span style="color:red">for </span><span style="color:grey">Testing</span>';

    await user.clear(input1);
    await user.clear(input2);
    await user.type(input1, testInputT1);
    await user.type(input2, testInputT2);

    expect(output.innerHTML).toBe(testOutputLocal);
  });

  it('Show different trimmed lines', async () => {
    const user = userEvent.setup();
    render(<TextDiff />);

    const selectedOption = 'Trimmed Lines';
    fireEvent.mouseDown(screen.getByLabelText(/Choose Diff Options/i));
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(selectedOption));

    const inputBox = screen.getByTestId('text-difference-options');
    expect(inputBox).toHaveValue(selectedOption);

    const input1 = screen.getByLabelText(/Text 1/i);
    const input2 = screen.getByLabelText(/Text 2/i);
    const output = screen.getByTestId('text-difference-output');

    const testInputT1 = ` I am some text for Testing.
    This is another line.
       Another line.
    One Last Line.
    `;
    const testInputT2 = `I too AM some text for Testing.
    this is another line.
    Another line.
    One last Line.
    `;

    const testOutputLocal = `<span style="color:red">I am some text for Testing.
This is another line.
</span><span style="color:green">I too AM some text for Testing.
this is another line.
</span><span style="color:grey">Another line.
</span><span style="color:red">One Last Line.
</span><span style="color:green">One last Line.
</span>`;

    await user.clear(input1);
    await user.clear(input2);
    await user.type(input1, testInputT1);
    await user.type(input2, testInputT2);

    expect(output.innerHTML).toBe(testOutputLocal);
  });

  it('Show different CSS', async () => {
    const user = userEvent.setup();
    render(<TextDiff />);

    const selectedOption = 'CSS';
    fireEvent.mouseDown(screen.getByLabelText(/Choose Diff Options/i));
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(selectedOption));

    const inputBox = screen.getByTestId('text-difference-options');
    expect(inputBox).toHaveValue(selectedOption);

    const input1 = screen.getByLabelText(/Text 1/i);
    const input2 = screen.getByLabelText(/Text 2/i);
    const output = screen.getByTestId('text-difference-output');

    const testInputT1 = `position: absolute;
color: red;
margin: 1px;
border: 2px solid blue;
    `;

    const testInputT2 = `position: absolute;
color: purple;
margin: 1%;
border: 2px dotted blue;
    `;

    const testOutputLocal = `<span style="color:grey">position: absolute;
color: </span><span style="color:red">red</span><span style="color:green">purple</span><span style="color:grey">;
margin: </span><span style="color:red">1px</span><span style="color:green">1%</span><span style="color:grey">;
border: 2px </span><span style="color:red">solid</span><span style="color:green">dotted</span><span style="color:grey"> blue;
    </span>`;

    await user.clear(input1);
    await user.clear(input2);
    await user.type(input1, testInputT1);
    await user.type(input2, testInputT2);

    expect(output.innerHTML).toBe(testOutputLocal);
  });

  // it.only('Show different JSON', async () => {
  //   const user = userEvent.setup();
  //   render(<TextDiff />);

  //   const selectedOption = 'JSON';
  //   fireEvent.mouseDown(screen.getByLabelText(/Choose Diff Options/i));
  //   const listbox = within(screen.getByRole('listbox'));
  //   fireEvent.click(listbox.getByText(selectedOption));

  //   const inputBox = screen.getByTestId('text-difference-options');
  //   expect(inputBox).toHaveValue(selectedOption);

  //   const input1 = screen.getByLabelText(/Text 1/i);
  //   const input2 = screen.getByLabelText(/Text 2/i);
  //   const output = screen.getByTestId('text-difference-output');

  //   const testInputT1 = `{{"name":"John", "age":30, "car":null}`;
  //   const testInputT2 = `{{"age":30, "name":"John", "car":null}`;
  //   const testOutputLocal = `<span style="color:grey">{"age": 30,"car": null,"name": "John"}</span>`;

  //   console.log('here');

  //   await user.clear(input1);
  //   await user.clear(input2);
  //   await user.type(input1, testInputT1);
  //   await user.type(input2, testInputT2);

  //   console.log('here2');

  //   expect(output.innerHTML).toBe(testOutputLocal);
  // });
});
