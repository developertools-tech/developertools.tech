import ClearIcon from '@mui/icons-material/Clear';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { Box, Button, TextField, Typography } from '@mui/material';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Layout from '../components/Layout';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';
import nextI18NextConfig from '../next-i18next.config.js';

export const debounceTime = 500;

export type CountResult = {
  characters: number;
  words: number;
  sentences: number;
  paragraphs: number;
};

function CharCountBox({
  children,
  testid,
}: {
  children: number;
  testid?: string;
}) {
  return (
    <span
      data-testid={testid}
      style={{ display: 'inline-block', minWidth: '4ch' }}
    >
      {children}
    </span>
  );
}

export default function CharCounterPage() {
  const [input, setInput] = useLocalState<string | void>({
    key: 'charCounterInput',
    defaultValue: '',
  });

  const defaultCounts = {
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
  };

  const [counts, setCounts] = useLocalState<CountResult | void>({
    key: 'charCounterCount',
    defaultValue: defaultCounts,
  });

  const { t } = useTranslation(['common', 'characterCounter']);

  const supportsClipboardRead = useSupportsClipboardRead();

  const debounceTimerRef = React.useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);
  function countResults(value: string) {
    clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      if (!value?.length) {
        setCounts(defaultCounts);
        return;
      }
      setCounts({
        characters: value?.length || 0,
        words: value?.split(/\s+/)?.length || 0,
        sentences:
          value?.split(/[.!?](?!\d)/g).filter(Boolean)?.length || 0,
        paragraphs:
          value?.split(/\n\s*\n/)?.filter(Boolean)?.length || 0,
      });
    }, debounceTime || 500);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setInput(event.target.value);
    countResults(event.target.value);
  }

  return (
    <Layout title={t('characterCounter:title')}>
      <Typography
        paragraph
        marginBottom={4}
      >
        {t('characterCounter:description')}
      </Typography>
      <Box
        display='flex'
        flexDirection={{ xs: 'column' }}
        alignItems='center'
        justifyContent='center'
        paddingBottom={2}
        width={1000}
        maxWidth='80%'
      >
        <TextField
          fullWidth
          multiline
          label={t('characterCounter:inputText')}
          value={input}
          name='input_text'
          onChange={handleInputChange}
        />
        <Box
          width={1000}
          maxWidth='80%'
          marginTop={2}
          borderColor='red'
          display='flex'
          justifyContent='end'
          gap={2}
        >
          <Button
            startIcon={<ClearIcon />}
            disabled={!input}
            onClick={() => {
              setInput('');
              setCounts(defaultCounts);
            }}
          >
            {t('common:clear')}
          </Button>
          {!!supportsClipboardRead && (
            <Button
              startIcon={<ContentPasteGoIcon />}
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                if (text) {
                  setInput(text);
                  countResults(text);
                }
              }}
            >
              {t('common:paste')}
            </Button>
          )}
        </Box>
      </Box>

      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems='center'
        justifyContent='center'
        paddingBottom={2}
        width={1000}
        maxWidth='80%'
        gap={2}
      >
        <Typography style={{ whiteSpace: 'nowrap' }}>
          {t('characterCounter:characters')}:&nbsp;
          <CharCountBox testid='characters'>
            {counts?.characters || 0}
          </CharCountBox>
        </Typography>
        <Typography style={{ whiteSpace: 'nowrap' }}>
          {t('characterCounter:words')}:&nbsp;
          <CharCountBox testid='words'>
            {counts?.words || 0}
          </CharCountBox>
        </Typography>
        <Typography style={{ whiteSpace: 'nowrap' }}>
          {t('characterCounter:sentences')}:&nbsp;
          <CharCountBox testid='sentences'>
            {counts?.sentences || 0}
          </CharCountBox>
        </Typography>
        <Typography style={{ whiteSpace: 'nowrap' }}>
          {t('characterCounter:paragraphs')}:&nbsp;
          <CharCountBox testid='paragraphs'>
            {counts?.paragraphs || 0}
          </CharCountBox>
        </Typography>
      </Box>
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['common', 'characterCounter'];

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(
    locale || 'en',
    i18nextNameSpaces as string[],
    nextI18NextConfig,
  );
  return {
    props: { ...translation },
  };
};
