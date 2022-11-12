import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import {
  camelCase,
  constantCase,
  Options,
  paramCase,
  pascalCase,
  snakeCase,
} from 'change-case';
import { lowerCase } from 'lower-case';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Namespace, useTranslation } from 'react-i18next';
import { titleCase } from 'title-case';
import { upperCase } from 'upper-case';

import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';
import nextI18NextConfig from '../next-i18next.config.js';

interface CaseDetails {
  name: string;
  conversionFunction: () => void;
}

export default function CaseConverterPage() {
  const { t } = useTranslation(['common', 'caseConverter']);

  const supportsClipboardRead = useSupportsClipboardRead();
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const [caseSelected, setCaseSelected] = useLocalState<string>({
    key: 'caseConverter_case_selected',
    defaultValue: '',
  });
  const [input, setInput] = useLocalState<string>({
    key: 'caseConverter_input',
    defaultValue: '',
  });
  const [output, setOutput] = useLocalState<string | void>({
    key: 'caseConverter_output',
    defaultValue: '',
  });

  const convert = useCallback(
    (
      coversionCallback: (input: string, options?: Options) => void,
      inputString: string,
      options = {},
    ) => {
      const convValue = options
        ? coversionCallback(inputString, options)
        : coversionCallback(inputString);
      setOutput(convValue);
    },
    [setOutput],
  );

  const casesAvailableData: Record<string, CaseDetails> = useMemo(
    () => ({
      'kebab-case': {
        name: t('caseConverter:kebabCase'),
        conversionFunction: () => {
          convert(paramCase, input);
        },
      },
      'camel-case': {
        name: t('caseConverter:camelCase'),
        conversionFunction: () => {
          convert(camelCase, input);
        },
      },
      'pascal-case': {
        name: t('caseConverter:pascalCase'),
        conversionFunction: () => {
          convert(pascalCase, input);
        },
      },
      'snake-case': {
        name: t('caseConverter:snakeCase'),
        conversionFunction: () => {
          convert(snakeCase, input);
        },
      },
      'screaming-snake-case': {
        name: t('caseConverter:screamingSnakeCase'),
        conversionFunction: () => {
          convert(constantCase, input);
        },
      },
      'screaming-kebab-case': {
        name: t('caseConverter:screamingKebabCase'),
        conversionFunction: () => {
          convert(paramCase, input, { transform: upperCase });
        },
      },
      'title-case': {
        name: t('caseConverter:titleCase'),
        conversionFunction: () => {
          convert(titleCase, input);
        },
      },
      'lower-case': {
        name: t('caseConverter:lowerCase'),
        conversionFunction: () => {
          convert(lowerCase, input);
        },
      },
      'upper-case': {
        name: t('caseConverter:upperCase'),
        conversionFunction: () => {
          convert(upperCase, input);
        },
      },
      'sarcasm-case': {
        name: t('caseConverter:sarcasmCase'),
        conversionFunction: () => {
          convert((inputStr: string) => {
            let sarcasmCaseOutput = '';
            let counter = 0;
            for (let i = 0; i < inputStr.length; i++) {
              const ch = inputStr[i];
              if (
                (ch >= 'a' && ch <= 'z') ||
                (ch >= 'A' && ch <= 'Z')
              ) {
                sarcasmCaseOutput +=
                  counter % 2 === 0 ? upperCase(ch) : lowerCase(ch);
                counter += 1;
              } else {
                sarcasmCaseOutput += ch;
              }
            }
            return sarcasmCaseOutput;
          }, input);
        },
      },
    }),
    [convert, input, t],
  );

  useEffect(() => {
    casesAvailableData[caseSelected]?.conversionFunction();
  }, [caseSelected, input]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setInput(event.target.value);
  }

  return (
    <Layout title={t('common:caseConverter')}>
      <Typography
        paragraph
        textAlign='center'
      >
        {t('caseConverter:description')}
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
          label={t('caseConverter:inputText')}
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
              setOutput('');
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
        flexDirection='column'
        justifyContent='center'
        width={1000}
        maxWidth='80%'
        gap={2}
        mb={3}
      >
        <FormControl>
          <InputLabel id='case_list_field_label'>
            {t('caseConverter:caseOptions')}
          </InputLabel>
          <Select
            labelId='case_list_field_label'
            value={caseSelected}
            label={t('caseConverter:caseOptions')}
            inputProps={{ 'data-testid': 'case-convert-options' }}
            onChange={(event: SelectChangeEvent) => {
              const selectedCase = event.target.value;
              setCaseSelected(selectedCase);
              casesAvailableData[selectedCase]?.conversionFunction();
            }}
          >
            {Object.keys(casesAvailableData).map((caseKey) => (
              <MenuItem
                key={casesAvailableData[caseKey]?.name}
                value={caseKey}
              >
                {casesAvailableData[caseKey]?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        width={1000}
        maxWidth='80%'
        paddingTop={2}
      >
        <Typography
          paragraph
          textAlign='center'
        >
          {t('caseConverter:outputText')}
        </Typography>
        <Box
          display='flex'
          justifyContent='center'
          flexDirection='row'
          overflow='hidden'
          padding={2}
          border='1px solid #494949'
          borderRadius={1}
          width='100%'
          sx={{
            '& pre': {
              fontsize: '1rem',
              lineHeight: '1.4375em',
              letterSpacing: '0.00938em',
            },
            '& .placeholder': {
              opacity: 0.7,
              padding: 2,
            },
          }}
        >
          <pre
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: output
                ? `<span data-testid='case-convert-output' style="color:white">${output}</span>`
                : '<span class="placeholder">Output</span>',
            }}
          />
        </Box>
        <Box
          display='flex'
          justifyContent='end'
          padding={2}
        >
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!output}
            onClick={() => {
              navigator.clipboard.writeText(output || '').then(
                () => {
                  setToastMessage(t('common:copiedToClipboard'));
                  setToastSeverity('success');
                  setToastOpen(true);
                },
                () => {
                  setToastMessage(t('common:failedToCopyToClipboard'));
                  setToastSeverity('error');
                  setToastOpen(true);
                },
              );
            }}
          >
            {t('common:copy')}
          </Button>
        </Box>
      </Box>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['common', 'caseConverter'];
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
