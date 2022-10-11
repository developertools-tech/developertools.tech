import Box from '@mui/material/Box';
import { decode, encode } from 'html-entities';
import React from 'react';

import useLocalState from '../../hooks/useLocalState';
import TextFieldWithCopyPaste from '../TextFieldWithCopyPaste';

export default function HtmlCharCodes() {
  const [unescaped, setUnescaped] = useLocalState<string>({
    key: 'htmlCharCode-unescaped',
    defaultValue: '',
  });
  const [escaped, setEscaped] = useLocalState<string>({
    key: 'htmlCharCode-escaped',
    defaultValue: '',
  });

  const clearBoth = () => {
    setUnescaped('');
    setEscaped('');
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='stretch'
      gap={6}
      width={1000}
      maxWidth='100%'
    >
      <TextFieldWithCopyPaste
        hasCopy
        label='Unescaped'
        value={unescaped}
        onClearClick={clearBoth}
        onPasteCleck={(text) => {
          setUnescaped(text);
          setEscaped(encode(text, { mode: 'extensive' }));
        }}
        onChange={(event) => {
          setUnescaped(event.target.value);
          setEscaped(encode(event.target.value, { mode: 'extensive' }));
        }}
      />
      <TextFieldWithCopyPaste
        hasCopy
        label='Escaped'
        value={escaped}
        onClearClick={clearBoth}
        onPasteCleck={(text) => {
          setEscaped(text);
          setUnescaped(decode(text));
        }}
        onChange={(event) => setEscaped(event.target.value)}
        onBlur={(e) => {
          setUnescaped(decode(e.target.value));
        }}
      />
    </Box>
  );
}
