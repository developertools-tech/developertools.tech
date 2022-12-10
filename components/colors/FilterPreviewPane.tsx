import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { startTransition, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useLocalState from '../../hooks/useLocalState';

export default function PreviewPane({
  color,
  filter,
}: {
  color: string;
  filter: string;
}) {
  const { t } = useTranslation('colors');

  const [previewColor, setPreviewColor] = useLocalState<string>({
    key: 'colorPicker_previewColor',
    defaultValue: '#000000',
  });

  useEffect(() => {
    startTransition(() => {
      setPreviewColor(color);
    });
  }, [color, setPreviewColor]);

  const Outer = styled('div')({
    p: {
      fontSize: 12,
    },
  });

  const Inner = styled('div')({
    position: 'relative',
    width: '200px',
    height: '140px',
  });

  const ColorPreviewBox = styled('span')({
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'block',
    backgroundColor: previewColor,
    width: '100%',
    height: '100%',
    borderRadius: 4,
    clipPath: 'polygon(100% 0, 0% 100%, 0 0)',
  });

  const FilterPreviewBox = styled('span')({
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'block',
    backgroundColor: 'black',
    filter,
    width: '100%',
    height: '100%',
    borderRadius: 4,
    clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)',
  });

  return (
    <Outer aria-hidden='true'>
      <Typography>{t('selectedColor')}</Typography>
      <Inner>
        <ColorPreviewBox />
        <FilterPreviewBox />
      </Inner>
      <Typography textAlign='right'>{t('transformedColor')}</Typography>
    </Outer>
  );
}
