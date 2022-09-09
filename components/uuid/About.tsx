import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function UuidAbout() {
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
        About UUIDs
      </Typography>
      <Typography paragraph>
        A Universally Unique Identifier (UUID) is a 128-bit number used
        as a unique identifier.
      </Typography>
      <Typography paragraph>
        UUID v1 is pseudorandom, created using the time of creation and
        the MAC address of the computer that created it.
      </Typography>
      <Typography paragraph>
        UUID v3 is an MD5 hash, created using a namespace and a name.
        The namespace must be a UUID, and the name can be any string.
        Given the same namespace and name, you will always get the same
        UUID.
      </Typography>
      <Typography paragraph>
        UUID v4 is random or pseudorandom, depending on how it is
        generated. The version 4 UUIDs produced by this tool are
        cryptographically-strong random values.
      </Typography>
      <Typography paragraph>
        UUID v5 is a SHA-1 hash, created using a namespace and a name.
        Much like v3 UUIDs, given the same namespace and name, you will
        always get the same UUID. The namespace for v5 UUIDs can either
        be a UUID, or a preset namespace type (URL, DNS, ISO OID, and
        X.500 DN), this tool does not currently support ISO OID or X.500
        DN.
      </Typography>
    </Box>
  );
}
