import { Container, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as convert from 'colors-convert';
import { HEX, HSL, RGB } from 'colors-convert/dist/cjs/lib/types/types';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

import Heading from '../components/Heading';
import Layout from '../components/Layout';

export default function Colors() {
  const [colorPickerColor, setColorPickerColor] =
    useState<HEX>('#000000');
  const [hexColor, setHexColor] = useState<HEX>(colorPickerColor);
  const [hslColor, setHslColor] = useState<HSL>({ h: 0, s: 0, l: 0 });
  const [rgbColor, setRGBColor] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const [err, setErr] = useState<string>();

  function HandleHexChange(hex: HEX) {
    setHexColor(hex);
    setColorPickerColor(hex);
    setHslColor(convert.hexToHsl(hex));
    setRGBColor(convert.hexToRgb(hex));
  }

  function HandleRGBChange(value: string) {
    const valArr = value.split(',');
    const rgb = {
      r: parseInt(valArr[0], 10),
      g: parseInt(valArr[1], 10),
      b: parseInt(valArr[2], 10),
    };
    setRGBColor(rgb);
    setHexColor(convert.rgbToHex(rgb));
    setHslColor(convert.rgbToHsl(rgb));
  }

  function HandleHSLChange(value: string) {
    const valArr = value.split(',');
    const hsl = {
      h: parseInt(valArr[0], 10),
      s: parseInt(valArr[1], 10),
      l: parseInt(valArr[2], 10),
    };
    setHslColor(hsl);
    setRGBColor(convert.hslToRgb(hsl));
    setHexColor(convert.hslToHex(hsl));
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
          <SketchPicker
            disableAlpha
            color={colorPickerColor}
            onChange={(color) => {
              updateColors({
                target: { name: 'hex', value: color.hex },
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
              defaultValue={hexColor}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                updateColors(e);
              }}
            />
            <TextField
              label='HSL'
              name='hsl'
              defaultValue={`${hslColor?.h}, ${hslColor?.s}, ${hslColor?.l}`}
              value={`${hslColor?.h}, ${hslColor?.s}, ${hslColor?.l}`}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                updateColors(e);
              }}
            />
            <TextField
              label='RGB'
              name='rgb'
              defaultValue={`${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`}
              onChange={(e) => {
                updateColors(e);
              }}
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
