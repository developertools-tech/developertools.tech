import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLocalState from '../hooks/useLocalState';

export default function CaseConverterPage() {
  const [input1, setInput1] = useLocalState<string>({
    key: 'caseConverter_input1',
    defaultValue: '',
  });
  const [output, setOutput] = useLocalState<string | void>({
    key: 'caseConverter_output',
    defaultValue: '',
  });

  const convert = useCallback(() => {
    let value = '';
    value += `<span style="color:white">${input1}</span>`;
    setOutput(value);
  }, [input1, setOutput]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setInput1(event.target.value);
  }

  return (
    <Layout title='Case Converter'>
      <Heading>Case Converter</Heading>
      <Typography
        paragraph
        textAlign='center'
      >
        Type or paste text that needs to be converted.
      </Typography>
      <Box
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent='center'
        paddingBottom={2}
        width={1100}
      >
        <TextField
          sx={{ width: 600 }}
          label='Input Text'
          value={input1}
          name='first text'
          onChange={handleInputChange}
        />
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        flexDirection='row'
        paddingBottom={2}
        width={1100}
      >
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Kebab Case
        </Button>
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Camel Case
        </Button>
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Pascal Case
        </Button>
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Snake Case
        </Button>
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Screaming Snake Case
        </Button>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        flexDirection='row'
        paddingBottom={2}
        width={1100}
      >
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Title Case
        </Button>
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Lower Case
        </Button>
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Upper Case
        </Button>
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Sarcasm Case
        </Button>
        <Button
          fullWidth
          style={{ marginLeft: 5, marginRight: 5 }}
          variant='outlined'
          disabled={false}
          onClick={convert}
        >
          Screaming Kebab Case
        </Button>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        width={1000}
        maxWidth='100%'
        paddingTop={2}
      >
        <Typography
          paragraph
          textAlign='center'
        >
          Output of case conversion
        </Typography>
        <Box
          display='flex'
          justifyContent='center'
          flexDirection='row'
          padding={2}
          border='1px solid #494949'
          width={600}
          sx={{
            '& .bad-line': {
              backgroundColor: '#ff330050',
            },
            '& .bad-letter': {
              backgroundColor: '#ff000080',
            },
            '& pre': {
              fontsize: '1rem',
              lineHeight: '1.4375em',
              letterSpacing: '0.00938em',
            },
            '& .placeholder': {
              opacity: 0.7,
              padding: 2,
            },
          }}
        >
          <pre
            data-testid='text-difference-output'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html:
                output || '<span class="placeholder">Output</span>',
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
}
