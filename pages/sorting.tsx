import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

export default function Sorting() {
  const supportsClipboardRead = useSupportsClipboardRead();
  const [inputText, setInputText] = useLocalState<string>({
    key: 'inputTextLocalState',
    defaultValue: '',
  });

  const [sortStyle, setSortStyle] = useLocalState<string>({
    key: 'sortStyleLocalState',
    defaultValue: 'ascending',
  });

  const [separator, setSeparator] = useLocalState<string>({
    key: 'separatorLocalState',
    defaultValue: ',',
  });

  const [outputText, setOutputText] = useLocalState<string>({
    key: 'outputTextLocalState',
    defaultValue: '',
  });

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  const handleSortStyleChange = (event: SelectChangeEvent) => {
    setSortStyle(event.target.value);
  };

  const handleSeparatorChange = (event: SelectChangeEvent) => {
    setSeparator(event.target.value);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handlePaste = async () => {
    const textCopied = await navigator.clipboard.readText();
    setInputText(textCopied);
    setOutputText(decodeURIComponent(textCopied));
  };

  const handleSort = () => {
    if (inputText === '') {
      setToastMessage('Please enter some text to sort.');
      setToastSeverity('error');
      setToastOpen(true);
      return;
    }

    if (separator === '') {
      setToastMessage('Please enter a separator.');
      setToastSeverity('error');
      setToastOpen(true);
      return;
    }

    let inputTextArray;

    if (separator === 'lineBreak') {
      inputTextArray = inputText.split(/\r\n|\n\r|\n|\r/);
      setSeparator('\n');
    } else {
      inputTextArray = inputText.split(separator);
    }
    const outputTextArray =
      sortStyle === 'reverse'
        ? inputTextArray.reverse()
        : inputTextArray.sort((a, b) => {
            if (sortStyle === 'ascending') {
              return a.localeCompare(b);
            }
            if (sortStyle === 'descending') {
              return b.localeCompare(a);
            }
            if (sortStyle === 'ascending2') {
              if (a.length === b.length) {
                return a.localeCompare(b);
              }
              return a.length - b.length;
            }
            if (sortStyle === 'descending2') {
              if (a.length === b.length) {
                return b.localeCompare(a);
              }
              return b.length - a.length;
            }
            return 0;
          });

    setOutputText(outputTextArray.join(separator));
    if (separator === '\n') setSeparator('lineBreak');
  };

  return (
    <Layout>
      <Heading>Sorting Tool</Heading>
      <Typography paragraph>
        Paste or Type an list and select options from the dropdown to
        sort
      </Typography>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='stretch'
        gap={6}
        width={1000}
        maxWidth='100%'
      >
        <Box
          display='flex'
          flexDirection='column'
        >
          <TextField
            label='Input'
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            multiline
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
          >
            <Button
              startIcon={<ClearIcon />}
              onClick={handleClear}
            >
              Clear
            </Button>
            {supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={handlePaste}
              >
                Paste
              </Button>
            )}

            <FormControl sx={{ m: 2, minWidth: 250 }}>
              <InputLabel id='sortStyle'>Sort Style</InputLabel>
              <Select
                value={sortStyle}
                label='Sort Style'
                onChange={handleSortStyleChange}
              >
                <MenuItem value='ascending'>
                  <em>ascending</em>
                </MenuItem>
                <MenuItem value='descending'>descending</MenuItem>
                <MenuItem value='ascending2'>
                  ascending (length)
                </MenuItem>
                <MenuItem value='descending2'>
                  descending (length)
                </MenuItem>
                <MenuItem value='reverse'>reverse</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 2, minWidth: 250 }}>
              <InputLabel id='separator'>Separator</InputLabel>
              <Select
                value={separator}
                label='Separator'
                onChange={handleSeparatorChange}
              >
                <MenuItem value=','>
                  <em>Comma (,)</em>
                </MenuItem>
                <MenuItem value={' '}>Space ( )</MenuItem>
                <MenuItem value='.'>Full Stop (.)</MenuItem>
                <MenuItem value=';'>Semicolon (;)</MenuItem>
                <MenuItem value='lineBreak'>New Line</MenuItem>
              </Select>
            </FormControl>

            <Button onClick={handleSort}>Sort</Button>
          </Box>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
        >
          <TextField
            label='Output'
            value={outputText}
            multiline
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='end'
          >
            <Button
              startIcon={<ContentCopyIcon />}
              disabled={!outputText}
              onClick={() => {
                navigator.clipboard.writeText(outputText || '').then(
                  () => {
                    setToastMessage('Copied to clipboard');
                    setToastSeverity('success');
                    setToastOpen(true);
                  },
                  () => {
                    setToastMessage('Failed to copy to clipboard');
                    setToastSeverity('error');
                    setToastOpen(true);
                  },
                );
              }}
            >
              Copy
            </Button>
          </Box>
        </Box>
      </Box>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Layout>
  );
}
