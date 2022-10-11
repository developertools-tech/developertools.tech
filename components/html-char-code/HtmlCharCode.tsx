import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { decode, encode } from 'html-entities';
import React, { useEffect } from 'react';

import useLocalState from '../../hooks/useLocalState';
import TextFieldWithCopyOrPaste from '../TextFieldWithCopyOrPaste';

type MODE = 'encode' | 'decode';

export default function HtmlCharCodes() {
  const [mode, setMode] = useLocalState<MODE>({
    key: 'htmlCharCode-mode',
    defaultValue: 'encode',
  });
  const [input, setInput] = useLocalState<string>({
    key: 'htmlCharCode-input',
    defaultValue: '',
  });
  const [output, setOutput] = useLocalState<string>({
    key: 'htmlCharCode-output',
    defaultValue: '',
  });

  useEffect(() => {
    const convert = (text: string): string => {
      switch (mode) {
        case 'encode':
          return encode(text, { mode: 'extensive' });
        default:
          return decode(text);
      }
    };

    setOutput(convert(input));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mode]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='stretch'
      gap={6}
      width={1000}
      maxWidth='100%'
    >
      <Box paddingBottom={2}>
        <FormControl>
          <InputLabel id='mode-select-label'>Mode</InputLabel>
          <Select
            labelId='mode-select-label'
            id='mode-select'
            value={mode}
            label='Mode'
            onChange={(e) => setMode(e.target.value as MODE)}
          >
            <MenuItem value='encode'>Encode</MenuItem>
            <MenuItem value='decode'>Decode</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextFieldWithCopyOrPaste
        isCopy={false}
        label='Input'
        value={input}
        onClearClick={() => setInput('')}
        onPasteCleck={(text) => setInput(text)}
        onChange={(event) => setInput(event.target.value)}
      />
      <TextFieldWithCopyOrPaste
        isCopy
        label='Output'
        value={output}
      />
    </Box>
  );
}
