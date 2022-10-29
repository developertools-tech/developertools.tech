/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import QueryString from '../pages/query-string';

describe('QueryString', () => {
  it('converts string -> key/values correctly', async () => {
    const user = userEvent.setup();
    render(<QueryString />);

    const queryString = screen.getByLabelText('common:queryString');

    await user.clear(queryString);
    await user.type(queryString, 'testparam=mytestvalue&test2=value2');

    expect(
      screen.getByRole('textbox', { name: 'queryString:parameter 1' }),
    ).toHaveValue('testparam');
    expect(
      screen.getByRole('textbox', { name: 'queryString:parameter 2' }),
    ).toHaveValue('test2');
    expect(
      screen.getByRole('textbox', { name: 'queryString:parameter 3' }),
    ).toHaveValue('');

    expect(
      screen.getByRole('textbox', { name: 'queryString:value 1' }),
    ).toHaveValue('mytestvalue');
    expect(
      screen.getByRole('textbox', { name: 'queryString:value 2' }),
    ).toHaveValue('value2');
    expect(
      screen.getByRole('textbox', { name: 'queryString:value 3' }),
    ).toHaveValue('');
  });

  it('converts key/values -> string correctly', async () => {
    const user = userEvent.setup();
    render(<QueryString />);

    const queryString = screen.getByLabelText('common:queryString');

    await user.clear(queryString);
    await user.type(
      screen.getByRole('textbox', { name: 'queryString:parameter 1' }),
      'testparam',
    );
    await user.type(
      screen.getByRole('textbox', { name: 'queryString:value 1' }),
      'testvalue',
    );

    await user.type(
      screen.getByRole('textbox', { name: 'queryString:parameter 2' }),
      'test2',
    );
    await user.type(
      screen.getByRole('textbox', { name: 'queryString:value 2' }),
      'value2',
    );

    await user.type(
      screen.getByRole('textbox', { name: 'queryString:parameter 3' }),
      'this',
    );
    await user.type(
      screen.getByRole('textbox', { name: 'queryString:value 3' }),
      '<html & one>',
    );

    expect(queryString).toHaveValue(
      'testparam=testvalue&test2=value2&this=%3Chtml+%26+one%3E',
    );
  });

  it('clears inputs with clear button', async () => {
    const user = userEvent.setup();
    render(<QueryString />);

    const queryString = screen.getByLabelText('common:queryString');
    const clearBtn = screen.getByRole('button', {
      name: 'common:clear',
    });

    await user.clear(queryString);
    await user.type(
      queryString,
      'testparam=testvalue&test2=value2&this=%3Chtml+%26+one%3E',
    );
    await user.click(clearBtn);

    expect(queryString).toHaveValue('');
    expect(
      screen.getByRole('textbox', { name: 'queryString:parameter 1' }),
    ).toHaveValue('');
    expect(
      screen.getByRole('textbox', { name: 'queryString:value 1' }),
    ).toHaveValue('');
  });

  it('new rows are automatically added', async () => {
    const user = userEvent.setup();
    render(<QueryString />);

    const queryString = screen.getByLabelText('common:queryString');

    await user.clear(queryString);

    await user.type(
      screen.getByRole('textbox', { name: 'queryString:parameter 1' }),
      'Test',
    );
    expect(
      screen.getByRole('textbox', { name: 'queryString:parameter 2' }),
    ).toHaveValue('');

    await user.type(
      screen.getByRole('textbox', { name: 'queryString:value 2' }),
      'value',
    );
    expect(
      screen.getByRole('textbox', { name: 'queryString:value 3' }),
    ).toHaveValue('');
  });

  it('delete buttons remove a row', async () => {
    const user = userEvent.setup();
    render(<QueryString />);

    const queryString = screen.getByLabelText('common:queryString');

    await user.clear(queryString);
    await user.type(
      queryString,
      'testparam=testvalue&test2=value2&this=%3Chtml+%26+one%3E',
    );
    expect(
      screen.getByRole('textbox', { name: 'queryString:parameter 2' }),
    ).toHaveValue('test2');

    await user.click(
      screen.getByRole('button', { name: 'queryString:deleteRow 2' }),
    );
    expect(
      screen.getByRole('textbox', { name: 'queryString:value 2' }),
    ).toHaveValue('<html & one>');

    await user.click(
      screen.getByRole('button', { name: 'queryString:deleteRow 1' }),
    );
    expect(queryString).toHaveValue('this=%3Chtml+%26+one%3E');
  });

  it('keep the base url and fragement if there is one', async () => {
    const user = userEvent.setup();
    render(<QueryString />);

    const queryString = screen.getByLabelText('common:queryString');

    await user.clear(queryString);
    await user.type(
      queryString,
      'http://google.com/search?mytestparam=mytestvalue&test2=value2',
    );
    await user.type(
      screen.getByRole('textbox', { name: 'queryString:parameter 1' }),
      'modified',
    );
    expect(queryString).toHaveValue(
      'http://google.com/search?mytestparammodified=mytestvalue&test2=value2',
    );
  });
});
