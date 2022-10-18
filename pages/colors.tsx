import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as convert from 'colors-convert';
import { HEX, HSL, RGB } from 'colors-convert/dist/cjs/lib/types/types';
import React, { ChangeEvent, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

function serializeColor(value: HEX | HSL | RGB): string {
  if (typeof value === 'object') {
    return Object.values(value).join(', ');
  }
  return value.replace(/^#/, '');
}

function stringToNumArray(value: string): number[] | string {
  const valArr = value.split(',');
  if (
    valArr?.length >= 3 &&
    valArr.every((v) => !Number.isNaN(Number(v) || NaN))
  ) {
    return value.split(',').map((v) => parseInt(v, 10));
  }

  return value;
}

export default function Colors() {
  const supportsClipboardRead = useSupportsClipboardRead();
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  const [pickerColor, setPickerColor] = useLocalState<string>({
    key: 'colorPicker_pickerColor',
    defaultValue: '#000000',
  });
  const [hexColor, setHexColor] = useLocalState<string>({
    key: 'colorPicker_hexColor',
    defaultValue: '000000',
  });
  const [hexErr, setHexErr] = useLocalState<boolean>({
    key: 'colorPicker_hexErr',
    defaultValue: false,
  });
  const [hslColor, setHslColor] = useLocalState<string>({
    key: 'colorPicker_hslColor',
    defaultValue: '0, 0, 0',
  });
  const [hslErr, setHslErr] = useLocalState<boolean>({
    key: 'colorPicker_hslErr',
    defaultValue: false,
  });
  const [rgbColor, setRGBColor] = useLocalState<string>({
    key: 'colorPicker_rgbColor',
    defaultValue: '0, 0, 0',
  });
  const [rgbErr, setRgbErr] = useLocalState<boolean>({
    key: 'colorPicker_rgbErr',
    defaultValue: false,
  });
  const [err, setErr] = useLocalState<string>({
    key: 'colorPicker_err',
    defaultValue: '',
  });

  function HandleHexChange(hex: string) {
    setHexColor(serializeColor(hex));
    const sanitized = hex.replace(/^#/, '');
    if (/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
      setHslColor(serializeColor(convert.hexToHsl(`#${sanitized}`)));
      setRGBColor(serializeColor(convert.hexToRgb(`#${sanitized}`)));
      setPickerColor(`#${sanitized}`);
    } else {
      setErr('Invalid Hex Color');
      setHexErr(true);
    }
  }

  function HandleRGBChange(value: string) {
    const valArr = stringToNumArray(value);
    if (Array.isArray(valArr)) {
      const rgb = {
        r: valArr[0] <= 255 ? valArr[0] : 255,
        g: valArr[1] <= 255 ? valArr[1] : 255,
        b: valArr[2] <= 255 ? valArr[2] : 255,
      };
      const hex = convert.rgbToHex(rgb);
      setHexColor(serializeColor(hex));
      setPickerColor(hex);
      setRGBColor(serializeColor(rgb));
      setHslColor(serializeColor(convert.rgbToHsl(rgb)));
    } else {
      setRGBColor(value);
      setErr('Invalid RGB Color');
      setRgbErr(true);
    }
  }

  function HandleHSLChange(value: string) {
    const valArr = stringToNumArray(value);
    if (Array.isArray(valArr)) {
      const hsl = {
        h: valArr[0] <= 359 ? valArr[0] : 359,
        s: valArr[1] <= 100 ? valArr[1] : 100,
        l: valArr[2] <= 100 ? valArr[2] : 100,
      };
      const hex = convert.hslToHex(hsl);
      setPickerColor(hex);
      setHexColor(serializeColor(hex));
      setHslColor(serializeColor(hsl));
      setRGBColor(serializeColor(convert.hslToRgb(hsl)));
    } else {
      setHslColor(value);
      setErr('Invalid HSL Color');
      setHslErr(true);
    }
  }

  const updateColors = (
    eventData:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } },
  ) => {
    try {
      setErr('');
      setHexErr(false);
      setRgbErr(false);
      setHslErr(false);
      const { name, value } = eventData.target;
      switch (name) {
        case 'hex':
          HandleHexChange(value);
          break;
        case 'rgb':
          HandleRGBChange(value);
          break;
        case 'hsl':
          HandleHSLChange(value);
          break;
        default:
          break;
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      }
    }
  };

  return (
    <Layout>
      <Heading>Colors</Heading>
      <Box
        width='1000px'
        maxWidth='100%'
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent='center'
        alignItems={{ xs: 'center', md: 'flex-start' }}
        gap='4rem'
      >
        <Box>
          <HexColorPicker
            color={pickerColor}
            onChange={(color) => {
              updateColors({
                target: { name: 'hex', value: color },
              });
            }}
          />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='stretch'
          gap={4}
        >
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='flex-end'
            gap={1}
          >
            <TextField
              label='HEX'
              name='hex'
              error={hexErr}
              value={hexColor}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={updateColors}
            />
            <Box
              display='flex'
              flexWrap='wrap'
              gap={1}
            >
              <Button
                startIcon={<ContentCopyIcon />}
                disabled={!hexColor}
                onClick={() => {
                  navigator.clipboard.writeText(hexColor || '').then(
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
                      setHexColor(text);
                      updateColors({
                        target: { name: 'hex', value: text },
                      });
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
            justifyContent='center'
            alignItems='flex-end'
            gap={1}
          >
            <TextField
              label='HSL'
              name='hsl'
              error={hslErr}
              value={hslColor}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={updateColors}
            />
            <Box
              display='flex'
              flexWrap='wrap'
              gap={1}
            >
              <Button
                startIcon={<ContentCopyIcon />}
                disabled={!hslColor}
                onClick={() => {
                  navigator.clipboard.writeText(hslColor || '').then(
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
                      setHslColor(text);
                      updateColors({
                        target: { name: 'hsl', value: text },
                      });
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
            justifyContent='center'
            alignItems='flex-end'
            gap={1}
          >
            <TextField
              label='RGB'
              name='rgb'
              error={rgbErr}
              value={rgbColor}
              onChange={updateColors}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box
              display='flex'
              flexWrap='wrap'
              gap={1}
            >
              <Button
                startIcon={<ContentCopyIcon />}
                disabled={!rgbColor}
                onClick={() => {
                  navigator.clipboard.writeText(rgbColor || '').then(
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
                      setRGBColor(text);
                      updateColors({
                        target: { name: 'rgb', value: text },
                      });
                    }
                  }}
                >
                  Paste
                </Button>
              )}
            </Box>
          </Box>
          <Typography
            variant='body1'
            color='error'
            minHeight='26px'
          >
            {err}
          </Typography>
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
