import Typography from '@mui/material/Typography';
import React from 'react';

export default function Heading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography
      variant='h1'
      component='h1'
      color='primary.main'
      sx={{
        fontSize: {
          xs: '1.75rem',
          md: '3rem',
        },
        pb: 4,
      }}
    >
      {children}
    </Typography>
  );
}
