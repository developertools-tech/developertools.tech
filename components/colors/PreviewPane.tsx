import { styled } from '@mui/material/styles';
import React, { startTransition, useEffect } from 'react';

import useLocalState from '../../hooks/useLocalState';

export default function PreviewPane({
  color,
  withoutWrapper = false,
}: {
  color: string;
  withoutWrapper?: boolean;
}) {
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
    width: withoutWrapper ? '200px' : 'calc(100% - 32px)',
    height: withoutWrapper ? '140px' : 'calc(100% - 32px)',
    borderRadius: 4,
  });

  if (withoutWrapper) {
    return <ColorPreviewBox />;
  }

  return (
    <ColorPreviewContainer>
      <ColorPreviewBox />
    </ColorPreviewContainer>
  );
}
