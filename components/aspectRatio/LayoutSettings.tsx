import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { Theme, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface AspectRatioLayoutSettingsProps {
  margins: number;
  setMargins: (_value: number) => void;
  gap: number;
  setGap: (_value: number) => void;
  expand: number;
  setExpand: (_value: number) => void;
  layoutCount: number;
  setLayoutCount: (_value: number) => void;
  layoutWidths: string[];
  setLayoutWidths: (_value: string[]) => void;
}

export default function AspectRatioLayoutSettings({
  layoutCount,
  setLayoutCount,
  layoutWidths,
  setLayoutWidths,
  margins,
  setMargins,
  gap,
  setGap,
  expand,
  setExpand,
}: AspectRatioLayoutSettingsProps) {
  const theme = useTheme();

  const { t } = useTranslation('aspectRatio');
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

  return (
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
              {t('screenWidth')}
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
          value={layoutCount}
          valueLabelDisplay='auto'
          step={1}
          marks={[
            {
              value: 1,
              label: `1 ${t('across')}`,
            },
            {
              value: 10,
              label: `10 ${t('across')}`,
            },
          ]}
          min={1}
          max={10}
          sx={{ width: 240, mx: { xs: 4, sm: 8 }, my: 2 }}
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
          label={`${t('marginPixels')} (L+R)`}
          variant='outlined'
          value={margins || ''}
          name='margin'
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          onChange={(event) => {
            const { value } = event.currentTarget;
            const number = Number(value.replace(/\D/g, ''));
            setMargins(number);
          }}
        />
        <TextField
          label={t('gapPixels')}
          variant='outlined'
          value={gap || ''}
          name='gap'
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          onChange={(event) => {
            const { value } = event.currentTarget;
            const number = Number(value.replace(/\D/g, ''));
            setGap(number);
          }}
        />
        <TextField
          label={t('expandPercent')}
          variant='outlined'
          value={expand || ''}
          name='expand'
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          onChange={(event) => {
            const { value } = event.currentTarget;
            const number = Number(value.replace(/\D/g, ''));
            setExpand(number);
          }}
        />
      </Box>
    </Box>
  );
}
