import { Container, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as convert from 'colors-convert';
import { HEX, HSL, RGB } from 'colors-convert/dist/cjs/lib/types/types';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

import Heading from '../components/Heading';
import Layout from '../components/Layout';

export default function Colors() {
  const [colorPickerColor, setColorPickerColor] = useState<string>(
    convert.randomHex(),
  );
  const [hexColor, setHexColor] = useState<HEX>(colorPickerColor);
  const [hslColor, setHslColor] = useState<HSL>({
    h: 0,
    s: 100,
    l: 50,
  });
  const [rgbColor, setRGBColor] = useState<RGB>({ r: 255, g: 0, b: 0 });
  const [err, setErr] = useState<string>();

  const updateColors = (color: string) => {
    try {
      setErr('');
      setColorPickerColor(color);
      setHexColor(color);
      setHslColor(convert.hexToHsl(color));
      setRGBColor(convert.hexToRgb(color));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      }
    }
  };

  useEffect(() => {
    updateColors(hexColor);
  }, []);

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
              updateColors(color.hex);
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
              value={hexColor}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                updateColors(e.target.value);
              }}
            />
            <TextField
              label='HSL'
              value={`${hslColor?.h}, ${hslColor?.s}, ${hslColor?.l}`}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                const value = e.target.value.split(',');
                const hsl = {
                  h: parseInt(value[0], 2),
                  s: parseInt(value[1], 2),
                  l: parseInt(value[2], 2),
                };
                updateColors(convert.hslToHex(hsl));
              }}
            />
            <TextField
              label='RGB'
              value={`${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`}
              onChange={(e) => {
                try {
                  const value = e.target.value.split(',');
                  const rgb = {
                    r: parseInt(value[0], 10),
                    g: parseInt(value[1], 10),
                    b: parseInt(value[2], 10),
                  };
                  updateColors(convert.rgbToHex(rgb));
                } catch (error: unknown) {
                  if (e instanceof Error) {
                    setErr(e.message);
                  }
                }
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
