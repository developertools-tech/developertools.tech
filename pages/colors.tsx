import { Container, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as convert from 'colors-convert';
import { HEX, HSL, RGB } from 'colors-convert/dist/cjs/lib/types/types';
import React, { ChangeEvent } from 'react';
import { HexColorPicker } from 'react-colorful';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLocalState from '../hooks/useLocalState';

function serializeColor(value: HEX | HSL | RGB): string {
  if (typeof value === 'object') {
    return Object.values(value).join(', ');
  }
  return value;
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
  const [pickerColor, setPickerColor] = useLocalState<string>({
    key: 'colorPicker_pickerColor',
    defaultValue: '#000000',
  });
  const [hexColor, setHexColor] = useLocalState<string>({
    key: 'colorPicker_hexColor',
    defaultValue: '#000000',
  });
  const [hslColor, setHslColor] = useLocalState<string>({
    key: 'colorPicker_hslColor',
    defaultValue: '0, 0, 0',
  });
  const [rgbColor, setRGBColor] = useLocalState<string>({
    key: 'colorPicker_rgbColor',
    defaultValue: '0, 0, 0',
  });
  const [err, setErr] = useLocalState<string>({
    key: 'colorPicker_err',
    defaultValue: '',
  });

  function HandleHexChange(hex: string) {
    setHexColor(hex);
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
      setHslColor(serializeColor(convert.hexToHsl(hex)));
      setRGBColor(serializeColor(convert.hexToRgb(hex)));
      setPickerColor(hex);
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
    }
  }

  function HandleHSLChange(value: string) {
    const valArr = stringToNumArray(value);
    if (Array.isArray(valArr)) {
      const hsl = {
        h: valArr[0] <= 100 ? valArr[0] : 100,
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
    }
  }

  const updateColors = (
    eventData:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } },
  ) => {
    try {
      setErr('');
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
      <Container>
        <Box
          display='flex'
          gap='2rem'
        >
          <HexColorPicker
            color={pickerColor}
            onChange={(color) => {
              updateColors({
                target: { name: 'hex', value: color },
              });
            }}
          />
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='stretch'
            gap={6}
            width={1000}
            maxWidth='100%'
          >
            <TextField
              label='HEX'
              name='hex'
              value={hexColor}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={updateColors}
            />
            <TextField
              label='HSL'
              name='hsl'
              value={hslColor}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={updateColors}
            />
            <TextField
              label='RGB'
              name='rgb'
              value={rgbColor}
              onChange={updateColors}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography variant='body1'>{err}</Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
