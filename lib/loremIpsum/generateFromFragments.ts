import random from 'random';

import type { WordList } from '../../pages/lorem-ipsum';

interface GenerateFromFragmentsProps {
  paragraphCount: number;
  paragraphLength: number;
  sentenceLength: number;
  setParagraphs: (paragraphs: string[]) => void;
  wordList: WordList;
}

export default function generateFromFragments({
  paragraphCount,
  paragraphLength,
  sentenceLength,
  setParagraphs,
  wordList,
}: GenerateFromFragmentsProps) {
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
    return wordList.words[random.int(0, wordList.words.length - 1)];
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
