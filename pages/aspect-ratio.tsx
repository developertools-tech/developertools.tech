import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';

const previewMaxSize = 226;

// BUG: Low numbers like 1 or 3 give wrong results
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
      width: previewMaxSize,
      height: previewMaxSize / aspectRatio,
    };
  }
  return {
    width: previewMaxSize * aspectRatio,
    height: previewMaxSize,
  };
}

function getDisplayRatio({
  width,
  height,
}: {
  width: number | void;
  height: number | void;
}): string {
  if (!width || !height) {
    return '...';
  }
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

/*
function getLayoutsData({ width, height }: { width: number, height: number }) {
  let result = [];
  for (const layout of ['1 Across', '2 Across', '3 Acress', '4 Across', '5 Acress']) {

  }
}
*/

export default function AspectRatioPage() {
  const [width, setWidth] = React.useState<number | void>(1920);
  const [height, setHeight] = React.useState<number | void>(1080);
  const [newWidth, setNewWidth] = React.useState<number | void>(1440);
  const [newHeight, setNewHeight] = React.useState<number | void>(810);

  const hasWidthHeight = !!width && !!height;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.currentTarget;
    const number = Number(value.replace(/\D/g, ''));

    if (name === 'width') {
      setWidth(number);
      if (newHeight && height) {
        const aspectRatio = number / height;
        setNewWidth(Math.round(newHeight * aspectRatio));
      }
    }

    if (name === 'height') {
      setHeight(number);
      if (newWidth && width) {
        const aspectRatio = width / number;
        setNewHeight(Math.round(newWidth / aspectRatio));
      }
    }

    if (name === 'newWidth') {
      setNewWidth(number);
      if (width && height) {
        const aspectRatio = width / height;
        setNewHeight(Math.round(number / aspectRatio));
      }
    }

    if (name === 'newHeight') {
      setNewHeight(number);
      if (width && height) {
        const aspectRatio = width / height;
        setNewWidth(Math.round(number * aspectRatio));
      }
    }
  }

  const previewSize = hasWidthHeight
    ? getPreviewSize({ width, height })
    : { width: undefined, height: undefined };

  return (
    <Layout title='Aspect Ratio'>
      <Heading>Aspect Ratio</Heading>
      <Box
        display='flex'
        flexWrap='wrap'
        flexDirection='row-reverse'
        justifyContent='center'
        alignItems='start'
        gap={2}
        columnGap={8}
      >
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
              <Typography component='h2'>Source Dimensions</Typography>
              <TextField
                label='Source Width'
                variant='outlined'
                value={width || ''}
                name='width'
                onChange={handleChange}
              />
              <TextField
                label='Source Height'
                variant='outlined'
                value={height || ''}
                name='height'
                onChange={handleChange}
              />
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap={2}
            >
              <Typography component='h2'>Target Dimensions</Typography>
              <TextField
                label='Target Width'
                variant='outlined'
                value={newWidth || ''}
                name='newWidth'
                onChange={handleChange}
              />
              <TextField
                label='Target Height'
                variant='outlined'
                value={newHeight || ''}
                name='newHeight'
                onChange={handleChange}
              />
            </Box>
          </Box>
        </form>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='start'
          gap={2}
          pb={2}
        >
          <Typography component='h2'>Ratio Preview</Typography>
          <Box
            width={previewMaxSize}
            height={previewMaxSize}
            display='flex'
            flexDirection='column'
            gap={2}
            justifyContent='start'
            alignItems='center'
          >
            {hasWidthHeight && (
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
                {hasWidthHeight && (
                  <Chip
                    icon={<AspectRatioIcon />}
                    label={getDisplayRatio({ width, height })}
                    size='small'
                    sx={{ backgroundColor: 'transparent' }}
                  />
                )}
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
      <Typography
        mb={2}
        component='h2'
      >
        Layouts
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label='Image Layouts'
        >
          <TableHead>
            <TableRow>
              <TableCell>Layout</TableCell>
              <TableCell align='right'>640w</TableCell>
              <TableCell align='right'>1024w</TableCell>
              <TableCell align='right'>1440w</TableCell>
              <TableCell align='right'>1920w</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hasWidthHeight && (
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell
                  component='th'
                  scope='row'
                >
                  1 Across
                </TableCell>
                <TableCell align='right'>1024x768</TableCell>
                <TableCell align='right'>1024x768</TableCell>
                <TableCell align='right'>1024x768</TableCell>
                <TableCell align='right'>1024x768</TableCell>
              </TableRow>
            )}
            {/*
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell
                  component='th'
                  scope='row'
                >
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.calories}</TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
              </TableRow>
            ))}
          */}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
