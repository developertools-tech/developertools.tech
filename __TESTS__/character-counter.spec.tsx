import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import CharacterCounterPage, {
  debounceTime,
} from '../pages/character-counter';

const testInput = `Est eiusmod pariatur nostrud aliquip quis irure nisi amet quis proident ex irure proident esse ut veniam culpa laboris commodo fugiat laborum veniam nostrud labore ullamco exercitation amet eu excepteur. Tempor nulla cillum ea tempor tempor pariatur ex exercitation deserunt consequat ipsum officia voluptate laborum qui et exercitation ad mollit ad ut occaecat ea esse culpa sit nisi elit nisi. 

Incididunt minim elit pariatur adipisicing consectetur occaecat incididunt tempor fugiat occaecat et excepteur enim aliqua dolor occaecat eiusmod et voluptate deserunt commodo elit et eiusmod do aute do ipsum aute. Eiusmod mollit ullamco quis dolor proident dolor aute qui Lorem deserunt nostrud id esse cupidatat pariatur quis sint do quis esse veniam ad consequat pariatur ut adipisicing adipisicing ipsum minim. 

Ad amet mollit exercitation irure tempor cillum qui occaecat tempor commodo laboris ut officia cupidatat fugiat velit duis esse incididunt minim elit anim sint deserunt exercitation Lorem nisi labore in. Esse aliquip Lorem sit consectetur laborum dolor occaecat velit pariatur ipsum irure ad exercitation nisi in sunt anim fugiat non nostrud non excepteur pariatur consequat dolor laboris sit aute pariatur.`;

describe('CharacterCounter', () => {
  it('correctly counts all metrics', async () => {
    const user = userEvent.setup();
    render(<CharacterCounterPage />);

    const input = screen.getByLabelText('characterCounter:inputText');
    await user.clear(input);
    await user.type(input, testInput);

    await new Promise((resolve) =>
      // eslint-disable-next-line no-promise-executor-return -- wait for debounce
      setTimeout(resolve, debounceTime + 50),
    );

    const characters = screen.getByTestId('characters');
    const words = screen.getByTestId('words');
    const sentences = screen.getByTestId('sentences');
    const paragraphs = screen.getByTestId('paragraphs');

    expect(characters).toHaveTextContent('1222');
    expect(words).toHaveTextContent('180');
    expect(sentences).toHaveTextContent('6');
    expect(paragraphs).toHaveTextContent('3');
  });

  it('clears inputs with clear button', async () => {
    const user = userEvent.setup();
    render(<CharacterCounterPage />);

    const input = screen.getByLabelText('characterCounter:inputText');
    const clearBtn = screen.getByRole('button', { name: /Clear/i });

    await user.clear(input);
    await user.type(input, 'Hello, world!');

    await new Promise((resolve) =>
      // eslint-disable-next-line no-promise-executor-return -- wait for debounce
      setTimeout(resolve, debounceTime + 50),
    );

    let characters = screen.getByTestId('characters');
    let words = screen.getByTestId('words');
    let sentences = screen.getByTestId('sentences');
    let paragraphs = screen.getByTestId('paragraphs');

    expect(characters).toHaveTextContent('13');
    expect(words).toHaveTextContent('2');
    expect(sentences).toHaveTextContent('1');
    expect(paragraphs).toHaveTextContent('1');

    await user.click(clearBtn);

    expect(input).toHaveValue('');

    await new Promise((resolve) =>
      // eslint-disable-next-line no-promise-executor-return -- wait for debounce
      setTimeout(resolve, debounceTime + 50),
    );

    characters = screen.getByTestId('characters');
    words = screen.getByTestId('words');
    sentences = screen.getByTestId('sentences');
    paragraphs = screen.getByTestId('paragraphs');

    expect(characters).toHaveTextContent('0');
    expect(words).toHaveTextContent('0');
    expect(sentences).toHaveTextContent('0');
    expect(paragraphs).toHaveTextContent('0');
  });
});
