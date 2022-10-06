import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import * as convert from 'colors-convert';
import { HEX, HSL, RGB } from 'colors-convert/dist/cjs/lib/types/types';
import React, { useEffect, useState } from 'react';
import { HuePicker } from 'react-color';

import Heading from '../components/Heading';
import Layout from '../components/Layout';

export default function Colors() {
  const [colorPickerColor, setColorPickerColor] =
    useState<string>('#FF0000');
  const [hexColor, setHexColor] = useState<HEX>('#FF0000');
  const [hslColor, setHslColor] = useState<HSL>({
    h: 0,
    s: 100,
    l: 50,
  });
  const [rgbColor, setRGBColor] = useState<RGB>({ r: 255, g: 0, b: 0 });

  const updateColors = (color: string) => {
    setColorPickerColor(color);
    setHexColor(color);
    setHslColor(convert.hexToHsl(color));
    setRGBColor(convert.hexToRgb(color));
  };

  return (
    <Layout>
      <Heading>Colors</Heading>
      <Box>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='stretch'
          gap={6}
          width={1000}
          maxWidth='100%'
        >
          <HuePicker
            color={colorPickerColor}
            onChange={(color) => {
              updateColors(color.hex);
            }}
          />
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
            value={`${hslColor?.h}, ${hslColor?.s}%, ${hslColor?.l}%`}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label='RGB'
            value={`${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
}
