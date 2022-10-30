import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import changelog from '../data/changelog.yml';

export default function ChangeLog() {
  const { t } = useTranslation('top');
  const { locale } = useRouter();

  //           day  hour  min  sec  msec
  const range = 30 * 24 * 60 * 60 * 1000; // 30 days

  const now = new Date(Date.now());
  const compareDate = new Date(now.getTime() - range);

  const filteredChangelog = changelog.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate > compareDate;
  });

  if (!filteredChangelog.length) {
    return null;
  }

  return (
    <>
      <Typography
        mt={9}
        mb={2}
        component='h2'
        variant='h5'
        color='primary'
      >
        {t('recentChanges')}
      </Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: 450,
        }}
      >
        {filteredChangelog.map(({ date, note }) => {
          const formatter = new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          const formatted = formatter.format(new Date(date));
          return (
            <ListItem
              key={note}
              sx={{ px: 0 }}
            >
              <ListItemText
                primary={note}
                secondary={formatted}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
