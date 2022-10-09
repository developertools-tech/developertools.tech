import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { marked } from 'marked';
import React, { useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';

export default function MarkDownPreview() {
  const [output, setOutput] = useState('');

  return (
    <Layout title='MarkDownPreview'>
      <Heading>Markdown Previewer</Heading>
      <Typography
        paragraph
        textAlign='center'
      >
        Paste or type markdown style to preview it.
      </Typography>
      <Box
        className='mainBox'
        display='flex'
        justifyContent='stretch'
        gap={3}
        width='80%'
      >
        <TextField
          multiline
          rows={10}
          value={output}
          onChange={(ev) => setOutput(ev.target.value)}
          sx={{
            minWidth: '50%',
          }}
        />
        {/* eslint-disable react/no-danger */}
        <Typography
          data-testid='markdown-output'
          className='markdownOutput'
          paragraph
          dangerouslySetInnerHTML={{ __html: marked(output) }}
        />
      </Box>
    </Layout>
  );
}
