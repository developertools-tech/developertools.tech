/* eslint-disable react/no-array-index-key */
// TODO: Figure out a better way to replace array index keys
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface RegexMatchProps {
  match: RegExpMatchArray;
}

function RegexMatch({ match }: RegexMatchProps) {
  const { t } = useTranslation('regex');

  const [fullMatch, ...groups] = match;
  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        color='grey.600'
        sx={{ mb: 1 }}
        data-testid='match-result'
      >
        {`${t('fullMatch')}: `}
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
          data-testid='match-group'
        >
          {t('group')} #{index + 1}:{' '}
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
  }
  if (regex.global) {
    const matches = text.matchAll(regex);
    return Array.from(matches);
  }
  const match = text.match(regex);
  return match ? [match] : [];
}

function RegexTestCase({
  index,
  testCase,
  regex,
  onDelete,
  onInput,
  deleteDisabled,
}: RegexTestCaseProps) {
  const { t } = useTranslation('regex');

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
          {t('case')} #{index + 1}
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
        aria-label={t('testCaseContent')}
        placeholder={t('testCasePlaceholder')}
        maxRows={8}
        value={testCase}
        onChange={(event) => onInput(index, event.currentTarget.value)}
        InputProps={{
          // @ts-expect-error Unknown props will be passed as-is, needed for tests to work
          'data-testid': 'editor-latitude',
        }}
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
