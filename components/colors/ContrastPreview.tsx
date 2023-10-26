import DoneIcon from '@mui/icons-material/Done';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ContrastPreview({
  contrast,
  foreground,
  background,
}: {
  contrast: string;
  foreground: string;
  background: string;
}) {
  const { t } = useTranslation(['colors', 'common']);

  const contrastValue = parseFloat(contrast) || 0;

  const AANormal = contrastValue >= 4.5;
  const AALarge = contrastValue >= 3;
  const AAGui = contrastValue >= 3;
  const AAANormal = contrastValue >= 7;
  const AAALarge = contrastValue >= 4.5;

  const TextInput = styled('input')({
    border: '2px solid',
    borderColor: foreground,
    color: '#fff',
    padding: '5px',
    backgroundColor: '#121212',
  });

  return (
    <Box
      width='700px'
      maxWidth='100%'
      display='flex'
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent='center'
      alignItems={{ xs: 'center', md: 'flex-start' }}
      sx={{ flexGrow: 1 }}
    >
      <Grid
        container
        spacing={4}
        mb={4}
      >
        <Grid
          item
          xs={12}
        >
          <Typography
            align='left'
            variant='h5'
            borderBottom='1px solid #494949'
          >
            {t('colors:normalText')}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Box
            display='flex'
            flexDirection='column'
            gap={1}
            padding='2px 0px'
          >
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={2}
            >
              <Typography align='left'>{t('colors:wcagAA')}</Typography>
              <Chip
                label={AANormal ? t('colors:pass') : t('colors:fail')}
                color={AANormal ? 'success' : 'error'}
                size='small'
              />
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={2}
            >
              <Typography align='left'>
                {t('colors:wcagAAA')}
              </Typography>
              <Chip
                label={AAANormal ? t('colors:pass') : t('colors:fail')}
                color={AAANormal ? 'success' : 'error'}
                size='small'
              />
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
        >
          <Box
            border='1px solid #494949'
            borderRadius='4px'
            bgcolor={background}
            color={foreground}
            display='flex'
            justifyContent='center'
            gap={1}
            padding='22px'
          >
            <Typography>{t('colors:contrastTestString')}</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            align='left'
            variant='h5'
            borderBottom='1px solid #494949'
          >
            {t('colors:largeText')}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Box
            display='flex'
            flexDirection='column'
            gap={1}
            padding='2px 0px'
          >
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={2}
            >
              <Typography align='left'>{t('colors:wcagAA')}</Typography>
              <Chip
                label={AALarge ? t('colors:pass') : t('colors:fail')}
                color={AALarge ? 'success' : 'error'}
                size='small'
              />
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={2}
            >
              <Typography align='left'>
                {t('colors:wcagAAA')}
              </Typography>
              <Chip
                label={AAALarge ? t('colors:pass') : t('colors:fail')}
                color={AAALarge ? 'success' : 'error'}
                size='small'
              />
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
        >
          <Box
            border='1px solid #494949'
            borderRadius='4px'
            bgcolor={background}
            color={foreground}
            display='flex'
            justifyContent='center'
            gap={1}
            padding='22px'
          >
            <Typography
              fontSize={18}
              fontWeight='bold'
            >
              {t('colors:contrastTestString')}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            align='left'
            variant='h5'
            borderBottom='1px solid #494949'
          >
            {t('colors:gui')}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Box
            display='flex'
            flexDirection='column'
            gap={1}
            padding='2px 0px'
          >
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={2}
            >
              <Typography align='left'>{t('colors:wcagAA')}</Typography>
              <Chip
                label={AAGui ? t('colors:pass') : t('colors:fail')}
                color={AAGui ? 'success' : 'error'}
                size='small'
              />
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
        >
          <Box
            border='1px solid #494949'
            borderRadius='4px'
            bgcolor={background}
            color={foreground}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap={1}
            padding='12px 22px 22px'
          >
            <DoneIcon />
            <TextInput
              name='uiCheck'
              defaultValue={t('colors:textInput')}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
