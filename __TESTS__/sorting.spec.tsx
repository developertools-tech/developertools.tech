/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Sorting from '../pages/sorting';

describe('Sorting', () => {
  it('should sort', () => {
    render(<Sorting />);

    const CommaInputs = [
      'c,a,b',
      'c,a,b',
      'cc,a,bbb',
      'cc,a,bbb',
      'c,a,b',
    ];
    const otherSeparatorsInputs = [
      'c a b',
      'c.a.b',
      'c;a;b',
      'c\na\nb',
    ];
    const CommaOutputs = [
      'a,b,c',
      'c,b,a',
      'a,cc,bbb',
      'bbb,cc,a',
      'b,a,c',
    ];
    const otherSeparatorOutputs = [
      'a b c',
      'a.b.c',
      'a;b;c',
      'a\nb\nc',
    ];

    const SortStyleList = [
      'ascending',
      'descending',
      'ascending2',
      'descending2',
      'reverse',
    ];

    const SortButton = screen.getByRole('button', {
      name: 'Sort',
    }) as HTMLButtonElement;

    CommaInputs.forEach((input, index) => {
      const inputText = screen.getByLabelText(
        'Input',
      ) as HTMLInputElement;
      userEvent.type(inputText, input).then(() => {
        const sortStyle = screen.getByLabelText(
          'Sort Style',
        ) as HTMLInputElement;
        fireEvent.change(sortStyle, {
          target: { value: SortStyleList[index] },
        });
        userEvent.click(SortButton).then(() => {
          const outputText = screen.getByLabelText('Output');
          expect(outputText.innerText).toBe(CommaOutputs[index]);
        });
      });
    });

    const SeparatorsList = ['space', 'dot', 'semicolon', 'lineBreak'];
    otherSeparatorsInputs.forEach((input, index) => {
      const inputText = screen.getByLabelText(
        'Input',
      ) as HTMLInputElement;
      userEvent.type(inputText, input).then(() => {
        const separator = screen.getByLabelText(
          'Separator',
        ) as HTMLInputElement;
        fireEvent.change(separator, {
          target: { value: SeparatorsList[index] },
        });

        const sortStyle = screen.getByLabelText(
          'Sort Style',
        ) as HTMLInputElement;
        fireEvent.change(sortStyle, {
          target: { value: SortStyleList[index] },
        });

        userEvent.click(SortButton).then(() => {
          const outputText = screen.getByLabelText('Output');
          expect(outputText.innerText).toBe(
            otherSeparatorOutputs[index],
          );
        });
      });
    });
  });
});
