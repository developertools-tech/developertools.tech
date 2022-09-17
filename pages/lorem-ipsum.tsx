import Box from '@mui/material/Box';
import random from 'random';
import React, { useEffect, useState } from 'react';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
// import Toast, { ToastProps } from '../components/Toast';
import loremIpsumWords from '../data/loremIpsum/latin';
// import jeffGoldblum from '../data/loremIpsum/jeffGoldblum';
import willFerrell from '../data/loremIpsum/willFerrell';

export default function LoremIpsumPage() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  /*
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  */

  const isLorem = false;
  const wordlist = willFerrell;
  const sentenceLength = 30;
  const paragraphLength = 1;
  const paragraphCount = 3;

  function generateFromWords() {
    const result = [];

    function getWord() {
      return loremIpsumWords[random.int(0, loremIpsumWords.length - 1)];
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
    const adjustedSentenceLength =
      Math.round(sentenceLength / 6) < 3
        ? 3
        : Math.round(sentenceLength / 6);

    function getSeparator(): string {
      const separators = [
        '; ',
        '; ',
        '... ',
        ', ',
        ', ',
        ', ',
        ', ',
        ', ',
        ', ',
      ];
      return separators[random.int(0, separators.length - 1)];
    }
    function getEnder(): string {
      const enders = ['. ', '! ', '? '];
      return enders[random.int(0, enders.length - 1)];
    }
    function getFragment(): string {
      return wordlist[random.int(0, wordlist.length - 1)];
    }

    for (let paragraph = 0; paragraph < paragraphCount; paragraph++) {
      const paragraphData: string[] = [];
      for (let sentence = 0; sentence < paragraphLength; sentence++) {
        const sentenceData: string[] = [];
        for (let word = 0; word < adjustedSentenceLength; word++) {
          if (word === 0) {
            sentenceData.push(`${getFragment()}${getSeparator()}`);
          } else if (word === adjustedSentenceLength - 1) {
            sentenceData.push(`${getFragment()}${getEnder()}`);
          } else {
            sentenceData.push(`${getFragment()}${getSeparator()}`);
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
