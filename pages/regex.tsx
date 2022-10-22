/* eslint-disable react/no-array-index-key */
// TODO: Figure out a better way to replace array index keys
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useCallback, useMemo, useState } from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import RegexTestCase from '../components/regex/RegexTestCase';
import nextI18NextConfig from '../next-i18next.config.js';

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

export default function RegexTesterPage() {
  const [regexInput, setRegexInput] = useState('');
  const [testCases, setTestCases] = useState<string[]>(['']);
  const handleAddTestCase = useCallback(() => {
    setTestCases((cases) => [...cases, '']);
  }, []);
  const { t } = useTranslation('regex');
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
            label={t('regex')}
            placeholder='^(\d+)$'
            maxRows={8}
            value={regexInput}
            error={!!error}
            helperText={error ? error.message : t('description')}
            onChange={(event) =>
              setRegexInput(event.currentTarget.value)
            }
          />
        </Box>
        <Typography
          component='h2'
          sx={{ mb: 1, mt: 4, mx: 2 }}
        >
          {t('testCases')}
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
          {t('addTestCase')}
        </Button>
      </Container>
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['regex'];
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(
    locale!,
    i18nextNameSpaces as string[],
    nextI18NextConfig,
    ['en', 'ja'],
  );
  return {
    props: { ...translation },
  };
};
