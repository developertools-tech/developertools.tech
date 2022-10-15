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
import React, { useCallback, useState } from 'react';
import { titleCase } from 'title-case';
import { upperCase } from 'upper-case';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import useSupportsClipboardRead from '../hooks/useSupportsClipboardRead';

interface CaseDetails {
  name: string;
  conversionFunction: () => void;
}

export default function CaseConverterPage() {
  const supportsClipboardRead = useSupportsClipboardRead();
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const [caseSelected, setCaseSelected] = useState<string>('');
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

  const casesAvailableData: Record<string, CaseDetails> = {
    'kebab-case': {
      name: 'Kebab case',
      conversionFunction: () => {
        convert(paramCase, input);
      },
    },
    'camel-case': {
      name: 'Camel case',
      conversionFunction: () => {
        convert(camelCase, input);
      },
    },
    'pascal-case': {
      name: 'Pascal case',
      conversionFunction: () => {
        convert(pascalCase, input);
      },
    },
    'snake-case': {
      name: 'Snake case',
      conversionFunction: () => {
        convert(snakeCase, input);
      },
    },
    'screaming-snake-case': {
      name: 'Screaming Snake case',
      conversionFunction: () => {
        convert(constantCase, input);
      },
    },
    'screaming-kebab-case': {
      name: 'Screaming Kebab case',
      conversionFunction: () => {
        convert(paramCase, input, { transform: upperCase });
      },
    },
    'title-case': {
      name: 'Title case',
      conversionFunction: () => {
        convert(titleCase, input);
      },
    },
    'lower-case': {
      name: 'Lower case',
      conversionFunction: () => {
        convert(lowerCase, input);
      },
    },
    'upper-case': {
      name: 'Upper case',
      conversionFunction: () => {
        convert(upperCase, input);
      },
    },
    'sarcasm-case': {
      name: 'Sarcasm case',
      conversionFunction: () => {
        convert((inputStr: string) => {
          let sarcasmCaseOutput = '';
          for (let i = 0; i < inputStr.length; i++) {
            sarcasmCaseOutput +=
              i % 2 === 0
                ? upperCase(inputStr[i])
                : lowerCase(inputStr[i]);
          }
          return sarcasmCaseOutput;
        }, input);
      },
    },
  };

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setInput(event.target.value);
  }

  return (
    <Layout title='Case Converter'>
      <Heading>Case Converter</Heading>
      <Typography
        paragraph
        textAlign='center'
      >
        Type or paste text that needs to be converted.
      </Typography>
      <Box
        display='flex'
        flexDirection={{ xs: 'column' }}
        alignItems='center'
        justifyContent='center'
        paddingBottom={2}
        width={1100}
      >
        <TextField
          sx={{ width: 600 }}
          label='Input Text'
          value={input}
          name='input text'
          onChange={handleInputChange}
        />
        <Box
          width={600}
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
            Clear
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
              Paste
            </Button>
          )}
        </Box>
      </Box>
      <Box width={600}>
        <FormControl fullWidth>
          <InputLabel id='case_list_field_label__'>
            Case List
          </InputLabel>
          <Select
            fullWidth
            labelId='case_list_field_label'
            value={caseSelected}
            label='Case List'
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
        maxWidth='100%'
        paddingTop={2}
      >
        <Typography
          paragraph
          textAlign='center'
        >
          Case conversion output
        </Typography>
        <Box
          display='flex'
          justifyContent='center'
          flexDirection='row'
          padding={2}
          border='1px solid #494949'
          width={600}
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
              padding: 2,
            },
          }}
        >
          <pre
            data-testid='text-difference-output'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: output
                ? `<span style="color:white">${output}</span>`
                : '<span class="placeholder">Output</span>',
            }}
          />
        </Box>
        <Box
          display='flex'
          justifyContent='end'
          padding={2}
          width={600}
        >
          <Button
            startIcon={<ContentCopyIcon />}
            disabled={!output}
            onClick={() => {
              navigator.clipboard.writeText(output || '').then(
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
            Copy
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
