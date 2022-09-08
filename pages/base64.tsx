import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { decode, encode } from 'js-base64';
import React from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLocalState from '../hooks/useLocalState';

export default function Base64Page() {
  const [ascii, setAscii] = useLocalState<string | void>({
    key: 'base64Ascii',
    defaultValue: '',
  });

  const [base64, setBase64] = useLocalState<string | void>({
    key: 'base64Base64',
    defaultValue: '',
  });

  const [isError, setIsError] = React.useState(false);

  function convertToAscii(value = base64) {
    try {
      setIsError(false);
      setAscii(decode(value || ''));
    } catch (e) {
      setIsError(true);
    }
  }

  function convertToBase64(value = ascii) {
    setIsError(false);
    setBase64(encode(value || ''));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    if (name === 'ascii') {
      setAscii(value);
      if (!value) {
        setBase64('');
      }
      convertToBase64(value);
    } else {
      setBase64(value);
      if (!value) {
        setAscii('');
      }
      convertToAscii(value);
    }
  }

  return (
    <Layout title='Base64'>
      <Heading>Base64</Heading>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='stretch'
        gap={2}
        width={1000}
        maxWidth='100%'
        sx={{
          '& textarea:not([aria-hidden="true"])': {
            minHeight: 'calc(40vh - 120px)',
          },
        }}
      >
        <TextField
          multiline
          label='ASCII'
          value={ascii}
          name='ascii'
          onChange={handleChange}
        />
        <TextField
          multiline
          label='Base64'
          value={base64}
          name='base64'
          onChange={handleChange}
          error={isError}
        />
      </Box>
    </Layout>
  );
}
