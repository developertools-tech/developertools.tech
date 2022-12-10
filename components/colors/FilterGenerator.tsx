import { Typography } from '@mui/material';
import * as convert from 'colors-convert';
import React from 'react';

import Color from '../../lib/colors/Color';
import Solver from '../../lib/colors/Solver';
import PreviewPane from './PreviewPane';

export default function FilterGenerator({ input }: { input: string }) {
  const rgb = convert.hexToRgb(input);

  const HEXColorRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const isValid = HEXColorRegExp.test(input);

  if (Object.keys(rgb).length !== 3 || !isValid) {
    return null;
  }

  const color = new Color(rgb.r, rgb.g, rgb.b);
  const solver = new Solver(color);
  const result = solver.solve();
  const lossMsg = '';
  const res = {
    color,
    solver,
    result,
    lossMsg,
  };

  if (res.result.loss < 1) {
    res.lossMsg = 'This is a perfect result.';
  } else if (res.result.loss < 5) {
    res.lossMsg = 'The is close enough.';
  } else if (res.result.loss < 15) {
    res.lossMsg =
      'The color is somewhat off. Consider running it again.';
  } else {
    res.lossMsg = 'The color is extremely off. Run it again!';
  }

  return (
    <>
      <Typography>CSS Filter Generator</Typography>
      <PreviewPane
        color={input}
        withoutWrapper
      />
      <PreviewPane
        color={res.color.toRgb()}
        withoutWrapper
      />
      <Typography>{res.result.filter}</Typography>
      <Typography>Loss: {res.result.loss}</Typography>
      <Typography>{res.lossMsg}</Typography>
    </>
  );
}
