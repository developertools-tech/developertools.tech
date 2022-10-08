import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLocalState from '../hooks/useLocalState';

enum FileType {
  PNG = 'image/png',
  JPG = 'image/jpeg',
  WEBP = 'image/webp',
}

const FILE_TYPE_EXTENSIONS = {
  [FileType.PNG]: '.png',
  [FileType.JPG]: '.jpg',
  [FileType.WEBP]: '.webp',
};

const FILE_TYPE_OPTIONS = [
  { label: 'PNG', value: FileType.PNG },
  { label: 'JPG', value: FileType.JPG },
  { label: 'WebP', value: FileType.WEBP },
];

function renameFile(filename: string, fileType: FileType) {
  return (
    filename.substring(0, filename.lastIndexOf('.')) +
    FILE_TYPE_EXTENSIONS[fileType]
  );
}

function formatSliderLabel(value: number) {
  return `${Math.round(value * 100)}%`;
}

const PreviewImage = styled('img')({});

export default function ImageConverterPage() {
  const [file, setFile] = useState<{ raw: File; imageSrc: string }>();
  const [fileType, setFileType] = useLocalState<FileType>({
    key: 'image-converter-file-type',
    defaultValue: FileType.WEBP,
  });
  const [quality, setQuality] = useLocalState<number>({
    key: 'image-converter-quality',
    defaultValue: 0.7,
  });
  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    // Bail immediately if the user canceled
    if (
      !event.currentTarget.files ||
      event.currentTarget.files.length === 0
    ) {
      return;
    }
    const eventFile = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile({ raw: eventFile, imageSrc: reader.result as string });
    };
    reader.readAsDataURL(eventFile);
  };
  const handleFileTypeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setFileType(event.currentTarget.value as FileType);
  };
  const handleDownload = () => {
    if (!file) {
      return;
    }
    // Create a canvas of the target size to draw the image
    const canvas = document.createElement('canvas');
    const image = new Image();
    image.src = file.imageSrc;
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image on the canvas and convert it to the selected type
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL(fileType, quality);

    // Create a dummy link to trigger the download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = renameFile(file.raw.name, fileType);
    link.click();
  };
  return (
    <Layout title='Image Converter'>
      <Heading>Image Converter</Heading>
      <Container>
        <Grid
          container
          direction={{ xs: 'column', md: 'row' }}
        >
          <Grid
            item
            xs={6}
            sx={{
              height: '500px',
              borderRadius: '0.5rem',
              background: 'rgba(0,0,0,.5)',
              overflow: 'hidden',
            }}
          >
            {file && (
              <PreviewImage
                data-testid='image-preview'
                alt=''
                src={file?.imageSrc}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            )}
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ p: 2 }}
          >
            <Button
              variant='contained'
              component='label'
            >
              Upload image
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleInputChange}
              />
            </Button>

            <FormControl sx={{ display: 'flex', my: 3 }}>
              <FormLabel id='image-type-label'>File Type</FormLabel>
              <RadioGroup
                aria-labelledby='image-type-label'
                name='image-type'
                value={fileType}
                onChange={handleFileTypeChange}
                row
              >
                {FILE_TYPE_OPTIONS.map(({ label, value }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box sx={{ my: 3 }}>
              <Typography
                id='quality-slider'
                gutterBottom
              >
                Quality
              </Typography>
              <Slider
                value={quality}
                min={0}
                step={0.05}
                max={1}
                onChange={(e, value) => setQuality(value as number)}
                valueLabelDisplay='auto'
                valueLabelFormat={formatSliderLabel}
                disabled={fileType === FileType.PNG}
                aria-labelledby='quality-slider'
              />
            </Box>
            <Button
              variant='contained'
              onClick={handleDownload}
              disabled={!file}
            >
              Download
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
