import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useLocalState from '../../hooks/useLocalState';

export interface AspectRatioSourceAndTargetProps {
  width: number | void;
  setWidth: (_width: number) => void;
  height: number | void;
  setHeight: (_height: number) => void;
}

export default function SourceAndTarget({
  width,
  setWidth,
  height,
  setHeight,
}: AspectRatioSourceAndTargetProps) {
  const [newWidth, setNewWidth] = useLocalState<number | void>({
    key: 'aspectRatioNewWidth',
    defaultValue: 1440,
  });
  const [newHeight, setNewHeight] = useLocalState<number | void>({
    key: 'aspectRatioNewHeight',
    defaultValue: 810,
  });

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
  const { t } = useTranslation('aspectRatio');

  return (
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
        <Typography component='h2'>{t('sourceDimensions')}</Typography>
        <TextField
          label={t('sourceWidth')}
          variant='outlined'
          value={width || ''}
          name='width'
          onChange={handleChange}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
        />
        <TextField
          label={t('sourceHeight')}
          variant='outlined'
          value={height || ''}
          name='height'
          onChange={handleChange}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
        />
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        gap={2}
      >
        <Typography component='h2'>{t('targetDimensions')}</Typography>
        <TextField
          label={t('targetWidth')}
          variant='outlined'
          value={newWidth || ''}
          name='newWidth'
          onChange={handleChange}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
        />
        <TextField
          label={t('targetHeight')}
          variant='outlined'
          value={newHeight || ''}
          name='newHeight'
          onChange={handleChange}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
        />
      </Box>
    </Box>
  );
}
