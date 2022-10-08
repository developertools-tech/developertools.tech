import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import jeffGoldblumFragments from '../data/loremIpsum/jeffGoldblum';
import loremIpsumWords from '../data/loremIpsum/latin';
import willFerrellFragments from '../data/loremIpsum/willFerrell';
import useLocalState from '../hooks/useLocalState';
import generateFromFragments from '../lib/loremIpsum/generateFromFragments';
import generateFromWords from '../lib/loremIpsum/generateFromWords';

export enum WordListTypes {
  words = 'WORDS',
  fragments = 'FRAGMENTS',
}

export type WordList = {
  title: string;
  words: string[];
  type: WordListTypes;
};

const wordLists: WordList[] = [
  {
    title: 'Latin',
    words: loremIpsumWords,
    type: WordListTypes.words,
  },
  {
    title: 'Will Ferrell',
    words: willFerrellFragments,
    type: WordListTypes.fragments,
  },
  {
    title: 'Jeff Goldblum',
    words: jeffGoldblumFragments,
    type: WordListTypes.fragments,
  },
];

export default function LoremIpsumPage() {
  const [wordList, setWordList] = useLocalState<WordList>({
    key: 'lorem-ipsum-word-list',
    defaultValue: wordLists[0],
  });

  const [sentenceLength, setSentenceLength] = useLocalState<number>({
    key: 'lorem-ipsum-sentence-length',
    defaultValue: 30,
  });

  const [paragraphLength, setParagraphLength] = useLocalState<number>({
    key: 'lorem-ipsum-paragraph-length',
    defaultValue: 2,
  });

  const [paragraphCount, setParagraphCount] = useLocalState<number>({
    key: 'lorem-ipsum-paragraph-count',
    defaultValue: 1,
  });

  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');

  useEffect(() => {
    const args = {
      wordList,
      sentenceLength,
      paragraphLength,
      paragraphCount,
      setParagraphs,
    };

    if (wordList.type === WordListTypes.words) {
      generateFromWords(args);
    } else {
      generateFromFragments(args);
    }
  }, [wordList, sentenceLength, paragraphLength, paragraphCount]);

  return (
    <Layout title='Lorem Ipsum'>
      <Heading>Lorem Ipsum</Heading>
      <Box
        display='flex'
        justifyContent='center'
        flexDirection='column'
        gap={4}
        mb={6}
        width={1000}
        maxWidth='100%'
      >
        <Box
          display='flex'
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
          width='100%'
          justifyContent='center'
          alignItems='center'
          gap={4}
        >
          <Box flex='1 1 100%'>
            <FormControl fullWidth>
              <InputLabel id='word_list_field_label'>
                Word List
              </InputLabel>
              <Select
                labelId='word_list_field_label'
                value={wordList.title}
                label='Word List'
                onChange={(event: SelectChangeEvent) => {
                  setWordList(
                    wordLists.find(
                      (list) => list.title === event.target.value,
                    ) || wordLists[0],
                  );
                }}
              >
                {wordLists.map((list) => (
                  <MenuItem
                    key={list.title}
                    value={list.title}
                  >
                    {list.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box flex='1 0 116px'>
            <Button
              startIcon={<ContentCopyIcon />}
              onClick={() => {
                navigator.clipboard
                  .writeText(paragraphs?.join('\n\n') || '')
                  .then(
                    () => {
                      setToastMessage('Copied to clipboard');
                      setToastSeverity('success');
                      setToastOpen(true);
                    },
                    () => {
                      setToastMessage('Failed to copy to clipboard');
                      setToastSeverity('error');
                      setToastOpen(true);
                    },
                  );
              }}
            >
              Copy Text
            </Button>
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
          width='100%'
          justifyContent='center'
          alignItems='center'
          gap={4}
        >
          <Box flex='1 1 100%'>
            <Typography>Sentence Length</Typography>
            <Slider
              aria-label='Sentence Length'
              value={sentenceLength}
              getAriaValueText={(value) => `Length: ${value}`}
              valueLabelDisplay='auto'
              step={10}
              marks
              min={10}
              max={100}
              onChange={(_, value) =>
                setSentenceLength(value as number)
              }
            />
          </Box>
          <Box flex='1 1 100%'>
            <Typography>Paragraph Length</Typography>
            <Slider
              aria-label='Paragraph Length'
              value={paragraphLength}
              getAriaValueText={(value) => `Length: ${value}`}
              valueLabelDisplay='auto'
              marks
              min={1}
              max={10}
              onChange={(_, value) =>
                setParagraphLength(value as number)
              }
            />
          </Box>
          <Box flex='1 1 100%'>
            <Typography>Paragraph Count</Typography>
            <Slider
              aria-label='Paragraph Count'
              value={paragraphCount}
              getAriaValueText={(value) => `Count: ${value}`}
              valueLabelDisplay='auto'
              marks
              min={1}
              max={10}
              onChange={(_, value) =>
                setParagraphCount(value as number)
              }
            />
          </Box>
        </Box>
        <div data-testid='lorem-ipsum-text'>
          {paragraphs.map((paragraph, index) => (
            <>
              {/* eslint-disable-next-line react/no-array-index-key */}
              <Typography key={index}>{paragraph}</Typography>
            </>
          ))}
        </div>
      </Box>
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        severity={toastSeverity}
      />
    </Layout>
  );
}
