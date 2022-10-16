import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import CaseConverterPage from '../pages/case-converter';

const testInput1 = 'hello world';
const testInput2 = 'Hello World';

describe('CaseConverter', () => {
  it('Kebab Case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput1);

    const selectedOption = 'kebab-case';
    const label = 'Kebab case';

    await user.click(screen.getByLabelText('Case List'));
    const listBox = within(screen.getByRole('listbox'));
    await user.click(listBox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'hello-world';
    expect(output.textContent).toBe(testOutput);
  });

  it('Camel case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput1);

    const selectedOption = 'camel-case';
    const label = 'Camel case';

    await user.click(screen.getByLabelText('Case List'));
    const listbox = within(screen.getByRole('listbox'));
    await user.click(listbox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'helloWorld';
    expect(output.textContent).toBe(testOutput);
  });

  it('Pascal Case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput1);

    const selectedOption = 'pascal-case';
    const label = 'Pascal case';

    await user.click(screen.getByLabelText('Case List'));
    const listbox = within(screen.getByRole('listbox'));
    await user.click(listbox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'HelloWorld';
    expect(output.textContent).toBe(testOutput);
  });

  it('Snake Case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput1);

    const selectedOption = 'snake-case';
    const label = 'Snake case';

    await user.click(screen.getByLabelText('Case List'));
    const listBox = within(screen.getByRole('listbox'));
    await user.click(listBox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'hello_world';
    expect(output.textContent).toBe(testOutput);
  });

  it('Screaming Snake Case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput1);

    const selectedOption = 'screaming-snake-case';
    const label = 'Screaming Snake case';

    await user.click(screen.getByLabelText('Case List'));
    const listBox = within(screen.getByRole('listbox'));
    await user.click(listBox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'HELLO_WORLD';
    expect(output.textContent).toBe(testOutput);
  });

  it('Screaming Kebab Case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput1);

    const selectedOption = 'screaming-kebab-case';
    const label = 'Screaming Kebab case';

    await user.click(screen.getByLabelText('Case List'));
    const listBox = within(screen.getByRole('listbox'));
    await user.click(listBox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'HELLO-WORLD';
    expect(output.textContent).toBe(testOutput);
  });

  it('Title Case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput1);

    const selectedOption = 'title-case';
    const label = 'Title case';

    await user.click(screen.getByLabelText('Case List'));
    const listBox = within(screen.getByRole('listbox'));
    await user.click(listBox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'Hello World';
    expect(output.textContent).toBe(testOutput);
  });

  it('Lower Case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput2);

    const selectedOption = 'lower-case';
    const label = 'Lower case';

    await user.click(screen.getByLabelText('Case List'));
    const listBox = within(screen.getByRole('listbox'));
    await user.click(listBox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'hello world';
    expect(output.textContent).toBe(testOutput);
  });

  it('Upper Case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput1);

    const selectedOption = 'upper-case';
    const label = 'Upper case';

    await user.click(screen.getByLabelText('Case List'));
    const listBox = within(screen.getByRole('listbox'));
    await user.click(listBox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'HELLO WORLD';
    expect(output.textContent).toBe(testOutput);
  });

  it('Sarcasm Case', async () => {
    const user = userEvent.setup();
    render(<CaseConverterPage />);

    const input = screen.getByLabelText('Input Text');
    await user.clear(input);
    await user.type(input, testInput1);

    const selectedOption = 'sarcasm-case';
    const label = 'Sarcasm case';

    await user.click(screen.getByLabelText('Case List'));
    const listBox = within(screen.getByRole('listbox'));
    await user.click(listBox.getByText(label));
    const inputBox = screen.getByTestId('case-convert-options');
    expect(inputBox).toHaveValue(selectedOption);

    const output = screen.getByTestId('case-convert-output');
    const testOutput = 'HeLlO wOrLd';
    expect(output.textContent).toBe(testOutput);
  });
});
