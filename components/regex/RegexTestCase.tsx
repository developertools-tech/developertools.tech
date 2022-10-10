import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { memo } from 'react';

interface RegexMatchProps {
  match: RegExpMatchArray;
}

function RegexMatch({ match }: RegexMatchProps) {
  const [fullMatch, ...groups] = match;
  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        color='grey.600'
        sx={{ mb: 1 }}
      >
        Full match:{' '}
        <Typography
          color='grey.300'
          component='span'
        >
          {fullMatch}
        </Typography>
      </Typography>
      {groups.map((group, index) => (
        <Typography
          key={index}
          color='grey.600'
          sx={{ mt: 1 }}
        >
          Group #{index + 1}:{' '}
          <Typography
            color='grey.300'
            component='span'
          >
            {group}
          </Typography>
        </Typography>
      ))}
    </Box>
  );
}

interface RegexTestCaseProps {
  index: number;
  testCase: string;
  regex: RegExp | null;
  onDelete: (index: number) => void;
  onInput: (index: number, text: string) => void;
  deleteDisabled: boolean;
}

function getAllMatches(text: string, regex: RegExp | null) {
  if (!regex) {
    return [];
  } else {
    if (regex.global) {
      const matches = text.matchAll(regex);
      return Array.from(matches);
    }
    const match = text.match(regex);
    return match ? [match] : [];
  }
}

function RegexTestCase({
  index,
  testCase,
  regex,
  onDelete,
  onInput,
  deleteDisabled,
}: RegexTestCaseProps) {
  const matches = getAllMatches(testCase, regex);
  const hasMatch = matches.length > 0;
  return (
    <Box
      p={2}
      border={1}
      borderRadius={1}
      borderColor={hasMatch ? 'success.main' : 'grey.900'}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography
          component='h3'
          color={hasMatch ? 'success.main' : 'grey.300'}
        >
          Case #{index + 1}
        </Typography>
        <IconButton
          aria-label='Delete test case'
          onClick={() => onDelete(index)}
          disabled={deleteDisabled}
          size='small'
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <TextField
        fullWidth
        multiline
        aria-label='Test case content'
        placeholder='Lorem ipsum...'
        maxRows={8}
        value={testCase}
        onChange={(event) => onInput(index, event.currentTarget.value)}
      />
      {matches &&
        matches.map((match, key) => (
          <RegexMatch
            key={key}
            match={match}
          />
        ))}
    </Box>
  );
}

export default memo(RegexTestCase);
