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

  const ColorPreviewContainer = styled('span')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '200px',
    height: '140px',
    background:
      'linear-gradient(90deg, #000 20%, #7F7F7F 70%, #fff 85%)',
  });

  const ColorPreviewBox = styled('span')({
    display: 'block',
    backgroundColor: previewColor,
    width: 'calc(100% - 32px)',
    height: 'calc(100% - 32px)',
    borderRadius: 4,
  });

  return (
    <ColorPreviewContainer>
      <ColorPreviewBox />
    </ColorPreviewContainer>
  );
}
