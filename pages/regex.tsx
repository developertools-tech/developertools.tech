import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useCallback, useMemo, useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import RegexTestCase from '../components/regex/RegexTestCase';

const REGEX_REGEX = /^\/(.+)\/([gimsuy]*)$/;

function parseRegex(text: string) {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return { regex: null, error: null };
  }
  try {
    const match = trimmedText.match(REGEX_REGEX);
    if (match) {
      const [, expression, flags] = match;
      return {
        regex: new RegExp(expression, flags),
        error: null,
      };
    }
    return {
      regex: new RegExp(trimmedText),
      error: null,
    };
  } catch (e) {
    return {
      regex: null,
      error: e as Error,
    };
  }
}

const HELPER_TEXT =
  'Expressions with and without trailing slashes are supported. Add trailing slashes to use flags, ie /w+/ig';

export default function RegexTesterPage() {
  const [regexInput, setRegexInput] = useState('');
  const [testCases, setTestCases] = useState<string[]>(['']);
  const handleAddTestCase = useCallback(() => {
    setTestCases((cases) => [...cases, '']);
  }, []);
  const handleRemoveTestCase = useCallback((index: number) => {
    setTestCases((cases) => {
      const newCases = [...cases];
      newCases.splice(index, 1);
      return newCases;
    });
  }, []);
  const handleTestCaseInput = useCallback(
    (index: number, text: string) => {
      setTestCases((cases) => {
        const newCases = [...cases];
        newCases[index] = text;
        return newCases;
      });
    },
    [],
  );
  const { regex, error } = useMemo(
    () => parseRegex(regexInput),
    [regexInput],
  );
  return (
    <Layout title='Regex Tester'>
      <Heading>Regex Tester</Heading>
      <Container>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label='Regex'
            placeholder='^(\d+)$'
            maxRows={8}
            value={regexInput}
            error={!!error}
            helperText={error ? error.message : HELPER_TEXT}
            onChange={(event) =>
              setRegexInput(event.currentTarget.value)
            }
          />
        </Box>
        <Typography
          component='h2'
          sx={{ mb: 1, mt: 4, mx: 2 }}
        >
          Test Cases
        </Typography>
        <Stack spacing={2}>
          {testCases.map((testCase, index) => (
            <RegexTestCase
              key={index}
              index={index}
              testCase={testCase}
              regex={regex}
              onDelete={handleRemoveTestCase}
              onInput={handleTestCaseInput}
              deleteDisabled={testCases.length === 1}
            />
          ))}
        </Stack>
        <Button
          sx={{ m: 2 }}
          onClick={handleAddTestCase}
        >
          Add test case
        </Button>
      </Container>
    </Layout>
  );
}
