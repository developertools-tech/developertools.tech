import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ChangeEvent, useEffect, useState } from 'react';
import TextFieldWithCopyOrPaste from '../TextFieldWithCopyOrPaste';
import { encode, decode } from 'html-entities';
import useLocalState from '../../hooks/useLocalState';

type MODE = 'encode' | 'decode';

export default function HtmlCharCode() {
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

  const convert = (text: string): string => {
    switch (mode) {
      case 'encode':
        return encode(text, { mode: 'extensive' });
      case 'decode':
        return decode(text);
    }
  };

  useEffect(() => {
    setOutput(convert(input));
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
            <MenuItem value={'encode'}>Encode</MenuItem>
            <MenuItem value={'decode'}>Decode</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextFieldWithCopyOrPaste
        isCopy={false}
        label={'Input'}
        value={input}
        setValue={setInput}
        onClearClick={() => setInput('')}
        onPasteCleck={(text) => setInput(text)}
        onChange={(event) => setInput(event.target.value)}
      />
      <TextFieldWithCopyOrPaste
        isCopy={true}
        label={'Output'}
        value={output}
        setValue={setOutput}
      />
    </Box>
  );
}
