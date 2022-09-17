import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import jeffGoldblumWords from '../lib/loremIpsum/jeffGoldblum';
// import Toast, { ToastProps } from '../components/Toast';
import loremIpsumWords from '../lib/loremIpsum/loremIpsum';

export default function LoremIpsumPage() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  /*
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  */

  const isLorem = false;
  const wordlist = jeffGoldblumWords;
  const sentenceLength = 3;
  const paragraphLength = 1;
  const paragraphCount = 3;

  function generateFromWords() {
    const result = [];

    function getWord() {
      return loremIpsumWords[
        Math.floor(Math.random() * loremIpsumWords.length)
      ];
    }

    for (let paragraph = 0; paragraph < paragraphCount; paragraph++) {
      const paragraphData = [];
      for (let sentence = 0; sentence < paragraphLength; sentence++) {
        const sentenceData = [];
        for (let word = 0; word < sentenceLength; word++) {
          sentenceData.push(getWord());
        }
        sentenceData[0] =
          sentenceData[0].charAt(0).toUpperCase() +
          sentenceData[0].slice(1);
        sentenceData[sentenceLength - 1] += '. ';
        paragraphData.push(sentenceData.join(' '));
      }
      result.push(paragraphData.join(''));
    }

    setParagraphs(result);
  }

  function generateFromFragments() {
    const result = [];
    const { starters, segments, endings } = wordlist;

    for (let paragraph = 0; paragraph < paragraphCount; paragraph++) {
      const paragraphData: string[] = [];
      for (let sentence = 0; sentence < paragraphLength; sentence++) {
        const sentenceData: string[] = [];
        for (let word = 0; word < sentenceLength; word++) {
          if (word === 0) {
            sentenceData.push(
              `${starters[Math.floor(Math.random() * starters.length)]
                .replace(/[.!?]/g, '')
                .toLowerCase()
                .trim()}, `,
            );
          } else if (word === sentenceLength - 1) {
            sentenceData.push(
              `${endings[Math.floor(Math.random() * endings.length)]
                .replace(/[.!?]/g, '')
                .toLowerCase()
                .trim()}. `,
            );
          } else {
            sentenceData.push(
              `${segments[Math.floor(Math.random() * segments.length)]
                .replace(/[.!?]/g, '')
                .toLowerCase()
                .trim()}, `,
            );
          }
        }
        sentenceData[0] =
          sentenceData[0].charAt(0).toUpperCase() +
          sentenceData[0].slice(1);
        paragraphData.push(sentenceData.join(' '));
      }
      result.push(paragraphData.join(''));
    }

    setParagraphs(result);
  }

  const generator = isLorem ? generateFromWords : generateFromFragments;

  useEffect(generator, []);

  return (
    <Layout title='Lorem Ipsum'>
      <Heading>Lorem Ipsum</Heading>
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        gap={4}
        mb={6}
        maxWidth='100%'
      >
        {paragraphs.map((paragraph, index) => (
          <>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <p key={index}>{paragraph}</p>
          </>
        ))}
      </Box>
      {/*
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        severity={toastSeverity}
      />
      */}
    </Layout>
  );
}
