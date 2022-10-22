import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function UuidAbout() {
  const { t } = useTranslation('uuid');
  return (
    <Box
      width={732}
      maxWidth='100%'
    >
      <Typography
        textAlign='center'
        variant='h6'
        component='h2'
        mb={1}
      >
        {t('aboudUuids')}
      </Typography>
      <Typography paragraph>{t('overview')}</Typography>
      <Typography paragraph>{t('aboutUuid1')}</Typography>
      <Typography paragraph>{t('aboutUuid3')}</Typography>
      <Typography paragraph>{t('aboutUuid4')}</Typography>
      <Typography paragraph>{t('aboutUuid5')}</Typography>
    </Box>
  );
}
