import Box from '@mui/material/Box';
import React from 'react';

import AspectRatioLayouts from '../components/aspectRatio/Layouts';
import AspectRatioPreview from '../components/aspectRatio/Preview';
import AspectRatioSourceAndTarget from '../components/aspectRatio/SourceAndTarget';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLocalState from '../hooks/useLocalState';

export default function AspectRatioPage() {
  const [width, setWidth] = useLocalState<number | void>({
    key: 'aspectRatioWidth',
    defaultValue: 1920,
  });
  const [height, setHeight] = useLocalState<number | void>({
    key: 'aspectRatioHeight',
    defaultValue: 1080,
  });
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
        <AspectRatioSourceAndTarget
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
        />
        <AspectRatioPreview
          width={width}
          height={height}
        />
      </Box>
      <AspectRatioLayouts
        width={width}
        height={height}
      />
    </Layout>
  );
}
