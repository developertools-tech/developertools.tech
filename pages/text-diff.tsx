import ClearIcon from '@mui/icons-material/Clear';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Diff from 'diff';
import { Change } from 'diff';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useCallback, useEffect } from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';
import nextI18NextConfig from '../next-i18next.config.js';

interface DiffOptions {
  label: string;
  description: string;
  value: (
    oldString: string,
    newString: string,
    options?: Diff.BaseOptions | undefined,
  ) => Change[];
}

export default function TextDiffPage() {
  const { t } = useTranslation(['common', 'textDiff']);

  const diffOptions: DiffOptions[] = [
    {
      label: t('textDiff:diffOptions.characters.label'),
      description: t('textDiff:diffOptions.characters.description'),
      value: Diff.diffChars,
    },
    {
      label: t('textDiff:diffOptions.charactersIgnoreCase.label'),
      description: t(
        'textDiff:diffOptions.charactersIgnoreCase.description',
      ),
      value: (oldStr: string, newStr: string) =>
        Diff.diffChars(oldStr, newStr, { ignoreCase: true }),
    },
    {
      label: t('textDiff:diffOptions.words.label'),
      description: t('textDiff:diffOptions.words.description'),
      value: Diff.diffWords,
    },
    {
      label: t('textDiff:diffOptions.wordsIgnoreCase.label'),
      description: t(
        'textDiff:diffOptions.wordsIgnoreCase.description',
      ),
      value: (oldStr: string, newStr: string) =>
        Diff.diffWords(oldStr, newStr, { ignoreCase: true }),
    },
    {
      label: t('textDiff:diffOptions.wordsWithSpace.label'),
      description: t('textDiff:diffOptions.wordsWithSpace.description'),
      value: Diff.diffWordsWithSpace,
    },
    {
      label: t('textDiff:diffOptions.trimmedLines.label'),
      description: t('textDiff:diffOptions.trimmedLines.description'),
      value: Diff.diffTrimmedLines,
    },
    {
      label: t('textDiff:diffOptions.sentences.label'),
      description: t('textDiff:diffOptions.sentences.description'),
      value: Diff.diffLines,
    },
    {
      label: t('textDiff:diffOptions.css.label'),
      description: t('textDiff:diffOptions.css.description'),
      value: Diff.diffCss,
    },
    {
      label: t('textDiff:diffOptions.json.label'),
      description: t('textDiff:diffOptions.json.description'),
      value: Diff.diffJson,
    },
  ];

  const supportsClipboardRead = useSupportsClipboardRead();
  const [selectedOptions, setSelectedOptions] = useLocalState<
    DiffOptions | undefined
  >({
    key: 'textDiff_option',
    defaultValue: diffOptions[0],
  });

  const [input1, setInput1] = useLocalState<string>({
    key: 'textDiff_input1',
    defaultValue: '',
  });
  const [input2, setInput2] = useLocalState<string>({
    key: 'textDiff_input2',
    defaultValue: '',
  });
  const [output, setOutput] = useLocalState<string | void>({
    key: 'textDiff_output',
    defaultValue: '',
  });
  const [input1ValidityMessage, setInput1ValidityMessage] =
    useLocalState({
      key: 'textDiff_input1Valid',
      defaultValue: {
        show: false,
        message: '',
      },
    });
  const [input2ValidityMessage, setInput2ValidityMessage] =
    useLocalState({
      key: 'textDiff_input2Valid',
      defaultValue: {
        show: false,
        message: '',
      },
    });
  const [diff, setDiff] = useLocalState<Change[]>({
    key: 'textDiff_diff',
    defaultValue: [],
  });

  function handleChange1(event: React.ChangeEvent<HTMLInputElement>) {
    setInput1(event.target.value);
  }
  function handleChange2(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    setInput2(input);
  }
  function handleSelectChange(event: SelectChangeEvent) {
    const selected = diffOptions.find(
      (diffOption) =>
        diffOption.label === (event.target.value as string),
    );
    setSelectedOptions(selected);
  }

  useEffect(() => {
    let inputJSON1: Record<string, unknown> | null = null;
    let inputJSON2: Record<string, unknown> | null = null;
    if (selectedOptions?.label === 'JSON') {
      try {
        inputJSON1 = JSON.parse(input1);
        setInput1ValidityMessage({
          message: '',
          show: false,
        });
      } catch (err) {
        setInput1ValidityMessage({
          show: true,
          message: 'Please ensure you entered a valid JSON object',
        });
      }
      try {
        inputJSON2 = JSON.parse(input2);
        setInput2ValidityMessage({
          message: '',
          show: false,
        });
      } catch (err) {
        setInput2ValidityMessage({
          show: true,
          message: 'Please ensure you entered a valid JSON object',
        });
      }
    }

    if (inputJSON1 && inputJSON2) {
      setDiff(Diff.diffJson(inputJSON1, inputJSON2));
    } else {
      let newdiff: Change[] = [];
      const selectedOption = diffOptions.find(
        (diffOption) => diffOption.label === selectedOptions?.label,
      );
      if (selectedOption) {
        newdiff = selectedOption.value(input1, input2);
      }

      setDiff(newdiff);
    }
  }, [
    selectedOptions,
    input1,
    input2,
    setInput1ValidityMessage,
    setInput2ValidityMessage,
    setDiff,
  ]);

  const compare = useCallback(() => {
    let value = '';
    diff.forEach((part) => {
      // green for additions, red for deletions
      // grey for common parts

      let clr = 'grey';
      if (part.added) {
        clr = 'green';
      } else if (part.removed) {
        clr = 'red';
      } else {
        clr = 'grey';
      }

      value += `<span style="color:${clr}">${part.value}</span>`;
    });
    setOutput(value);
  }, [diff, setOutput]);

  useEffect(() => {
    if (!input1 || !input2) {
      setOutput('');
    } else {
      compare();
    }
  }, [input1, input2, compare, setOutput]);
  return (
    <Layout title='Text Difference'>
      <Heading>Text Diff</Heading>
      <Typography
        paragraph
        textAlign='center'
      >
        {t('textDiff:description')}
      </Typography>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='stretch'
        width={1000}
        maxWidth='100%'
        gap={2}
        mb={3}
      >
        <FormControl>
          <InputLabel id='diff-select-label'>
            Choose Diff Options
          </InputLabel>
          <Select
            labelId='diff-select-label'
            id='diff-select'
            value={selectedOptions?.label}
            label='Choose Diff Options'
            onChange={handleSelectChange}
            inputProps={{ 'data-testid': 'text-difference-options' }}
          >
            {diffOptions.map((diffOption) => (
              <MenuItem
                key={diffOption.label}
                value={diffOption.label}
              >
                {diffOption.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {selectedOptions?.description}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        paddingBottom={2}
        width={1000}
        maxWidth='100%'
      >
        <Box
          display='flex'
          flexDirection='column'
          width={{ xs: '100%', sm: '45%' }}
        >
          <TextField
            multiline
            label={`${t('textDiff:text')} 1`}
            value={input1}
            name='first text'
            onChange={handleChange1}
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='flex-end'
            gap={2}
          >
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setInput1(text);
                  }
                }}
              >
                {t('common:paste')}
              </Button>
            )}
            <Button
              startIcon={<ClearIcon />}
              disabled={!input1}
              onClick={() => {
                setInput1('');
              }}
            >
              {t('common:clear')}
            </Button>
            {input1ValidityMessage.show && (
              <Typography sx={{ color: 'red' }}>
                {input1ValidityMessage.message}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          width={{ xs: '100%', sm: '45%' }}
        >
          <TextField
            multiline
            label={`${t('textDiff:text')} 2`}
            value={input2}
            name='second text'
            onChange={handleChange2}
          />
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='flex-end'
            gap={2}
          >
            {!!supportsClipboardRead && (
              <Button
                startIcon={<ContentPasteGoIcon />}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setInput2(text);
                  }
                }}
              >
                {t('common:paste')}
              </Button>
            )}
            <Button
              startIcon={<ClearIcon />}
              disabled={!input2}
              onClick={() => {
                setInput2('');
              }}
            >
              {t('common:clear')}
            </Button>
            {input2ValidityMessage.show && (
              <Typography sx={{ color: 'red' }}>
                {input2ValidityMessage.message}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='stretch'
        width={1000}
        maxWidth='100%'
        gap={2}
      >
        <Box
          padding='16.5px 14px'
          borderRadius='4px'
          border='1px solid #494949'
          sx={{
            '& .bad-line': {
              backgroundColor: '#ff330050',
            },
            '& .bad-letter': {
              backgroundColor: '#ff000080',
            },
            '& pre': {
              fontsize: '1rem',
              lineHeight: '1.4375em',
              letterSpacing: '0.00938em',
            },
            '& .placeholder': {
              opacity: 0.7,
            },
          }}
        >
          {/* eslint-disable react/no-danger */}
          <pre
            data-testid='text-difference-output'
            dangerouslySetInnerHTML={{
              __html:
                output ||
                `<span class="placeholder">${t(
                  'textDiff:difference',
                )}</span>`,
            }}
          />
          {/* eslint-enable react/no-danger */}
        </Box>
      </Box>
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['common', 'textDiff'];

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
