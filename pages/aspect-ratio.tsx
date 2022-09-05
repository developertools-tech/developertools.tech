import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ImageIcon from '@mui/icons-material/Image';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';

const previewWidth = 226;

function getPreviewSize({
  width,
  height,
}: {
  width: number;
  height: number;
}): { width: number; height: number } {
  const aspectRatio = width / height;
  if (width > height) {
    return {
      width: previewWidth,
      height: previewWidth / aspectRatio,
    };
  }
  return {
    width: previewWidth * aspectRatio,
    height: previewWidth,
  };
}

function getAspectRatio({
  width,
  height,
}: {
  width: number;
  height: number;
}): string {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

export default function AspectRatioPage() {
  const [width, setWidth] = React.useState(1920);
  const [height, setHeight] = React.useState(1080);

  const previewSize = getPreviewSize({ width, height });

  return (
    <Layout title='Aspect Ratio'>
      <Heading>Aspect Ratio</Heading>
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
        gap={2}
      >
        <Box
          width={previewWidth}
          height={previewWidth}
          display='flex'
          flexDirection='column'
          gap={2}
          justifyContent='center'
          alignItems='center'
        >
          <Chip
            icon={<AspectRatioIcon />}
            label={getAspectRatio({ width, height })}
            sx={{ p: 0.5 }}
          />
          <Paper
            elevation={3}
            sx={{
              width: previewSize.width,
              height: previewSize.height,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageIcon />
          </Paper>
        </Box>
        <form>
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='center'
            alignItems='center'
            gap={2}
          >
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap={2}
            >
              <TextField
                label='Source Width'
                variant='outlined'
                type='number'
                value={width}
                onChange={(event) =>
                  setWidth(Number(event.target.value))
                }
              />
              <TextField
                label='Source Height'
                variant='outlined'
                type='number'
                value={height}
                onChange={(event) =>
                  setHeight(Number(event.target.value))
                }
              />
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap={2}
            >
              <TextField
                label='Target Width'
                variant='outlined'
                type='number'
              />
              <TextField
                label='Target Height'
                variant='outlined'
                type='number'
              />
            </Box>
          </Box>
        </form>
      </Box>
    </Layout>
  );
}
