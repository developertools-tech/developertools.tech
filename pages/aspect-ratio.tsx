import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { Theme, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLayoutData from '../hooks/aspectRatio/useLayoutData';
import useLocalState from '../hooks/useLocalState';

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

// TODO: clean up
// TODO: save state for layoutCount (fix slider position on load)
// PERF: useLayoutData running multipe times
export default function AspectRatioPage() {
  const theme = useTheme();
  const [width, setWidth] = useLocalState<number | void>({
    key: 'aspectRatioWidth',
    defaultValue: 1920,
  });
  const [height, setHeight] = useLocalState<number | void>({
    key: 'aspectRatioHeight',
    defaultValue: 1080,
  });
  const [newWidth, setNewWidth] = useLocalState<number | void>({
    key: 'aspectRatioNewWidth',
    defaultValue: 1440,
  });
  const [newHeight, setNewHeight] = useLocalState<number | void>({
    key: 'aspectRatioNewHeight',
    defaultValue: 810,
  });
  const [margins, setMargins] = useLocalState({
    key: 'aspectRatioMargins',
    defaultValue: 0,
  });
  const [gap, setGap] = useLocalState({
    key: 'aspectRatioGap',
    defaultValue: 0,
  });
  const [expand, setExpand] = useLocalState({
    key: 'aspectRatioExpand',
    defaultValue: 0,
  });
  const [layoutCount, setLayoutCount] = useState(4);
  const [layoutWidths, setLayoutWidths] = useLocalState<string[]>({
    key: 'aspectRatioLayoutWidths',
    defaultValue: ['640', '1024', '1440', '1920'],
  });

  const layoutWidthOptions = [
    '300',
    '320',
    '480',
    '600',
    '640',
    '768',
    '900',
    '1000',
    '1024',
    '1200',
    '1280',
    '1366',
    '1440',
    '1536',
    '1600',
    '1920',
    '2560',
    '3840',
  ];

  function getDropdownStyles(
    name: string,
    personName: readonly string[],
    themeObj: Theme,
  ) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? themeObj.typography.fontWeightRegular
          : themeObj.typography.fontWeightMedium,
    };
  }

  function handleLayoutSizeChange(
    event: SelectChangeEvent<typeof layoutWidths>,
  ) {
    const {
      target: { value },
    } = event;
    const numbers =
      typeof value === 'string' ? value.split(',') : value;
    setLayoutWidths(
      numbers.sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
    );
  }

  function handleLayoutCountChange(
    event: Event,
    newValue: number | number[],
  ) {
    setLayoutCount(newValue as number);
  }

  const getLayoutData = useLayoutData({
    width,
    height,
    layoutWidths: layoutWidths.map((str) => parseInt(str, 10)),
    layoutCount,
    margin: margins,
    gap,
    expand,
  });

  const layoutData = getLayoutData();

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
        alignItems='center'
        gap={2}
        columnGap={8}
        mb={2}
      >
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
            width={previewMaxSize + 18}
            height={previewMaxSize + 8}
            display='flex'
            flexDirection='column'
            gap={2}
            justifyContent='center'
            alignItems='center'
            borderRadius={1}
            p={1}
            border='1px solid rgba(255, 255, 255, 0.2)'
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
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
        gap={8}
        mb={6}
      >
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          mb={2}
        >
          <div>
            <FormControl
              sx={{ m: 1, width: { xs: 240, lg: 400, xl: 500 } }}
            >
              <InputLabel id='demo-multiple-chip-label'>
                Screen Widths
              </InputLabel>
              <Select
                labelId='demo-multiple-chip-label'
                id='demo-multiple-chip'
                multiple
                value={layoutWidths}
                onChange={handleLayoutSizeChange}
                input={
                  <OutlinedInput
                    id='select-multiple-chip'
                    label='Screen Widths'
                  />
                }
                renderValue={(selected) => (
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                  >
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      // height * 4.5 + padding_top
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
              >
                {layoutWidthOptions.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getDropdownStyles(name, layoutWidths, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Slider
            aria-label='Number of layouts to display'
            defaultValue={4}
            valueLabelDisplay='auto'
            step={1}
            marks={[
              {
                value: 1,
                label: '1 Across',
              },
              {
                value: 10,
                label: '10 Across',
              },
            ]}
            min={1}
            max={10}
            sx={{ width: 240, mx: 8, my: 2 }}
            onChange={handleLayoutCountChange}
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
            label='Margin Pixels (L+R)'
            variant='outlined'
            value={margins || ''}
            name='margin'
            onChange={(event) => {
              const { value } = event.currentTarget;
              const number = Number(value.replace(/\D/g, ''));
              setMargins(number);
            }}
          />
          <TextField
            label='Gap Pixels'
            variant='outlined'
            value={gap || ''}
            name='gap'
            onChange={(event) => {
              const { value } = event.currentTarget;
              const number = Number(value.replace(/\D/g, ''));
              setGap(number);
            }}
          />
          <TextField
            label='Expand Percent'
            variant='outlined'
            value={expand || ''}
            name='expand'
            onChange={(event) => {
              const { value } = event.currentTarget;
              const number = Number(value.replace(/\D/g, ''));
              setExpand(number);
            }}
          />
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ mb: 3, maxWidth: 1000 }}
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label='Image Layouts'
        >
          <TableHead>
            <TableRow>
              <TableCell>Layout</TableCell>
              {layoutWidths.map((label) => (
                <TableCell
                  key={label}
                  align='right'
                >
                  {label}w
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {layoutData?.map(({ layout, columns }) => (
              <TableRow
                key={layout}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell
                  component='th'
                  scope='row'
                >
                  {layout}
                </TableCell>
                {columns.map((colValue) => (
                  <TableCell
                    align='right'
                    key={colValue}
                  >
                    {colValue}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
