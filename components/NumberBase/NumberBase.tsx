import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import React from 'react';

import useSupportsClipboardRead from '../../hooks/useSupportsClipboardRead';
import type { ToastProps } from '../Toast';

export interface NumberBaseInputOutputProps {
  inputBase: string | void;
  desiredBase: string | void;
  isError: boolean;
  setInputBase: (_ascii: string | void) => void;
  setDesiredBase: (_base64: string | void) => void;
  setIsError: (_isError: boolean) => void;
  setToastMessage: (_toastMessage: string) => void;
  setToastOpen: (_toastOpen: boolean) => void;
  setToastSeverity: (_toastSeverity: ToastProps['severity']) => void;
}

export default function NumberBase({
  inputBase,
  desiredBase,
  isError,
  setInputBase,
  setDesiredBase,
  setIsError,
  setToastMessage,
  setToastOpen,
  setToastSeverity,
}: NumberBaseInputOutputProps) {
  const supportsClipboardRead = useSupportsClipboardRead();

  const NUMBER_BASES = [
    { id: 1, base: 2 },
    { id: 2, base: 3 },
    { id: 3, base: 4 },
    { id: 4, base: 5 },
    { id: 5, base: 6 },
    { id: 6, base: 7 },
    { id: 7, base: 8 },
    { id: 8, base: 9 },
    { id: 9, base: 10 },
    { id: 10, base: 11 },
    { id: 11, base: 12 },
    { id: 12, base: 13 },
    { id: 13, base: 14 },
    { id: 14, base: 15 },
    { id: 15, base: 16 },
  ];
  
  const numberBase = NUMBER_BASES[0]['base'];

  function handleSelectedDesiredBase(event: React.ChangeEvent<HTMLInputElement>) {
    setDesiredBase(event.target.value);
  }

  function handleSelectedInputBase(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setInputBase(event.target.value);
  }
  function convertToInputBase(value = desiredBase) {
    try {
      setIsError(false);
      setInputBase();
    } catch (e) {
      setIsError(true);
    }
  }

  function convertToDesiredBase(value = inputBase) {
    setIsError(false);
    setDesiredBase();
  }

  function calculateInputBase(value: string | void) {
    setDesiredBase(value);
    if (!value) {
      setInputBase('');
    }
    convertToInputBase(value);
  }

  function calculateDesiredBase(value: string | void) {
    setInputBase(value);
    if (!value) {
      setDesiredBase('');
    }
    convertToDesiredBase(value);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    if (name === 'ascii') {
      calculateDesiredBase(value);
    } else {
      calculateInputBase(value);
    }
  }

  return (
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
        gap={2}
      >
        <div>
          <TextField
            multiline
            label='INPUTBASE'
            value={inputBase}
            name='input-base'
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id='outlined-select-currency-native'
            select
            label='Native select'
            value={numberBase}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText='Please select your preferred number base'
          >
            {NUMBER_BASES.map((numBase) => (
              <option
                key={numBase.id}
                onChange={handleSelectedInputBase}
                value={numBase.base}
              >
                {numBase.base}
              </option>
            ))}
          </TextField>
        </div>

        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ClearIcon />}
            disabled={!inputBase}
            onClick={() => {
              setInputBase('');
              setDesiredBase('');
            }}
          >
            Clear
          </Button>
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!inputBase}
            onClick={() => {
              navigator.clipboard.writeText(inputBase || '').then(
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
          {!!supportsClipboardRead && (
            <Button
              startIcon={<ContentPasteGoIcon />}
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                if (text) {
                  setInputBase(text);
                  calculateDesiredBase(text);
                }
              }}
            >
              Paste
            </Button>
          )}
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
      >
        <div>
          <TextField
            multiline
            label='desired-base'
            value={desiredBase}
            name='desired-base'
            onChange={handleChange}
            error={isError}
          />
        </div>

        <div>
          <TextField
            id='outlined-select-currency-native'
            select
            label='Native select'
            value={numberBase}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText='Please select your preferred number base'
          >
            {NUMBER_BASES.map((numBase) => (
              <option
                key={numBase.id}
                onChange={handleSelectedDesiredBase}
                value={numBase.base}
              >
                {numBase.base}
              </option>
            ))}
          </TextField>
        </div>
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ClearIcon />}
            disabled={!desiredBase}
            onClick={() => {
              setDesiredBase('');
              setInputBase('');
            }}
          >
            Clear
          </Button>
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!desiredBase}
            onClick={() => {
              navigator.clipboard.writeText(desiredBase || '').then(
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
          {!!supportsClipboardRead && (
            <Button
              startIcon={<ContentPasteGoIcon />}
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                if (text) {
                  setDesiredBase(text);
                  calculateInputBase(text);
                }
              }}
            >
              Paste
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
