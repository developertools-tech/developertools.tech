import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface AspectRatioPreviewProps {
  width: number | void;
  height: number | void;
}

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

export default function AspectRatioPreview({
  width,
  height,
}: AspectRatioPreviewProps) {
  const hasWidthHeight = !!width && !!height;

  const previewSize = hasWidthHeight
    ? getPreviewSize({ width, height })
    : { width: undefined, height: undefined };

  const { t } = useTranslation('aspectRatio');

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='start'
      gap={2}
      pb={2}
    >
      <Typography component='h2'>{t('ratioPreview')}</Typography>
      <Box
        width={previewMaxSize + 18}
        height={previewMaxSize + 18}
        display='flex'
        flexDirection='column'
        gap={2}
        justifyContent='center'
        alignItems='center'
        p={1}
        borderRadius={1}
        border='1px solid rgba(255, 255, 255, 0.2)'
      >
        {hasWidthHeight && (
          <Paper
            elevation={3}
            data-testid='ratio-preview'
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
  );
}
