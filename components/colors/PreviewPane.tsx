import { styled } from '@mui/material/styles';
import React, { startTransition, useEffect } from 'react';

import useLocalState from '../../hooks/useLocalState';

export default function PreviewPane({ color }: { color: string }) {
  const [previewColor, setPreviewColor] = useLocalState<string>({
    key: 'colorPicker_previewColor',
    defaultValue: '#000000',
  });

  useEffect(() => {
    startTransition(() => {
      setPreviewColor(color);
    });
  }, [color, setPreviewColor]);

  const Styled = styled('span')({
    display: 'block',
    backgroundColor: previewColor,
    borderRadius: 8,
    width: '200px',
    height: '100px',
  });

  return <Styled />;
}
