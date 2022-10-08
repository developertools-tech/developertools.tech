import random from 'random';

import type { WordList } from '../../pages/lorem-ipsum';

interface GenerateFromWordsProps {
  paragraphCount: number;
  paragraphLength: number;
  sentenceLength: number;
  setParagraphs: (paragraphs: string[]) => void;
  wordList: WordList;
}

export default function generateFromWords({
  paragraphCount,
  paragraphLength,
  sentenceLength,
  setParagraphs,
  wordList,
}: GenerateFromWordsProps) {
  const result = [];

  function getWord() {
    return wordList.words[random.int(0, wordList.words.length - 1)];
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
