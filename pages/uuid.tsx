import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import RefreshIcon from '@mui/icons-material/Refresh';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SelectInput from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import {
  // parse,
  // stringify,
  v1,
  v3,
  v4,
  v5,
  validate,
  version,
} from 'uuid';

import Heading from '../components/Heading';
import Layout from '../components/Layout';
import useLocalState from '../hooks/useLocalState';

export default function UuidPage() {
  const [uuidVersion, setUuidVersion] = useLocalState<number>({
    key: 'uuidVersion',
    defaultValue: 4,
  });
  const [namespace, setNamespace] = useLocalState<string>({
    key: 'uuidNamespace',
    defaultValue: '',
  });
  const [namespaceType, setNamespaceType] = useLocalState<string>({
    key: 'uuidNamespaceType',
    defaultValue: 'custom',
  });
  const [validateUuid, setValidateUuid] = useLocalState<string>({
    key: 'uuidValidate',
    defaultValue: '',
  });
  const [name, setName] = useLocalState<string>({
    key: 'uuidName',
    defaultValue: '',
  });
  const [uuid, setUuid] = useState<string>('');
  const [namespaceError, setNamespaceError] = useState<boolean>(false);
  const [validateResult, setValidateResult] = useState<string>('');
  const [validateError, setValidateError] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<string>('success');
  const [showPasteButton, setShowPasteButton] =
    useState<boolean>(false);

  function createUuid() {
    switch (uuidVersion) {
      case 1:
        setUuid(v1());
        break;
      case 3:
        if (!namespace || !name || !validate(namespace)) {
          setUuid('');
          break;
        }
        setUuid(v3(name, namespace));
        break;
      case 4:
        setUuid(v4());
        break;
      default:
        if (
          (!namespace && namespaceType === 'custom') ||
          (!validate(namespace) && namespaceType === 'custom') ||
          !name
        ) {
          setUuid('');
          break;
        }
        switch (namespaceType) {
          case 'url':
            setUuid(v5(name, v5.URL));
            break;
          case 'dns':
            setUuid(v5(name, v5.DNS));
            break;
          default:
            setUuid(v5(name, namespace));
            break;
        }
    }
  }

  function runUuidValidation(value: string) {
    if (!value) {
      setValidateResult('');
      setValidateError(false);
      return;
    }

    if (validate(value)) {
      setValidateResult(`Valid UUID v${version(value)}`);
      setValidateError(false);
      return;
    }

    setValidateResult('Invalid UUID');
    setValidateError(true);
  }

  function handleValidateChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setValidateUuid(event.target.value);
    runUuidValidation(event.target.value);
  }

  useEffect(() => {
    createUuid();
  }, [uuidVersion, namespace, namespaceType, name]);

  useEffect(() => {
    if (typeof navigator.clipboard?.readText === 'function') {
      setShowPasteButton(true);
    }
  }, []);

  return (
    <Layout title='UUID'>
      <Heading>UUID</Heading>
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        gap={4}
        mb={6}
        maxWidth='100%'
      >
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
          width={350}
          maxWidth='calc(100% - 48px)'
        >
          <Typography
            component='h2'
            textAlign='center'
          >
            Generate a UUID
          </Typography>
          <FormControl fullWidth>
            <InputLabel id='version-label'>UUID Version</InputLabel>
            <SelectInput
              fullWidth
              labelId='version-label'
              value={uuidVersion}
              label='UUID Version'
              onChange={(event) =>
                setUuidVersion(Number(event.target.value))
              }
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={1}>v1 (Pseudorandom)</MenuItem>
              <MenuItem value={3}>v3 (MD5 Hash)</MenuItem>
              <MenuItem value={4}>v4 (Random)</MenuItem>
              <MenuItem value={5}>v5 (SHA-1 Hash)</MenuItem>
            </SelectInput>
          </FormControl>
          {uuidVersion === 5 ? (
            <FormControl fullWidth>
              <InputLabel id='namespace-type-label'>
                Namespace Type
              </InputLabel>
              <SelectInput
                fullWidth
                labelId='namespace-type-label'
                value={namespaceType}
                label='Namespace Type'
                onChange={(event) =>
                  setNamespaceType(event.target.value)
                }
                sx={{ minWidth: 120 }}
              >
                <MenuItem value='custom'>Custom</MenuItem>
                <MenuItem value='url'>URL</MenuItem>
                <MenuItem value='dns'>DNS</MenuItem>
              </SelectInput>
            </FormControl>
          ) : null}
          {uuidVersion === 3 ||
          (uuidVersion === 5 && namespaceType === 'custom') ? (
            <TextField
              label='Namespace'
              value={namespace}
              error={namespaceError}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9-]*',
              }}
              helperText={namespaceError ? 'Invalid UUID' : ''}
              onChange={(event) => {
                setNamespace(event.target.value);
                setNamespaceError(
                  !validate(event.target.value) && !!event.target.value,
                );
              }}
            />
          ) : null}
          {uuidVersion === 3 || uuidVersion === 5 ? (
            <TextField
              label='Name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          ) : null}
          <TextField
            label='UUID'
            value={uuid}
            disabled
            fullWidth
            onClick={() => {
              navigator.clipboard.writeText(uuid);
            }}
          />
          <Box
            display='flex'
            gap={2}
          >
            {uuidVersion !== 5 && uuidVersion !== 3 ? (
              <Button
                startIcon={<RefreshIcon />}
                variant='contained'
                onClick={createUuid}
              >
                New UUID
              </Button>
            ) : (
              <Button
                startIcon={<ClearIcon />}
                variant='contained'
                onClick={() => {
                  setName('');
                  setNamespace('');
                  setNamespaceError(false);
                }}
              >
                Clear
              </Button>
            )}
            <Button
              startIcon={<ContentCopyIcon />}
              variant='contained'
              disabled={!uuid}
              sx={{ mr: 0, ml: 'auto' }}
              onClick={() => {
                navigator.clipboard.writeText(uuid).then(
                  () => {
                    setAlertMessage('Copied to clipboard');
                    setAlertSeverity('success');
                    setAlertOpen(true);
                  },
                  () => {
                    setAlertMessage('Failed to copy to clipboard');
                    setAlertSeverity('error');
                    setAlertOpen(true);
                  },
                );
              }}
            >
              Copy
            </Button>
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-end'
          gap={2}
          width={350}
          maxWidth='calc(100% - 48px)'
        >
          <Typography
            textAlign='center'
            component='h2'
            alignSelf='center'
          >
            Check UUID Version and Validity
          </Typography>
          <TextField
            label='UUID'
            value={validateUuid}
            error={validateError}
            helperText={validateResult}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9-]*',
            }}
            fullWidth
            onChange={handleValidateChange}
          />
          <Box
            display='flex'
            justifyContent='space-between'
            width='100%'
          >
            {showPasteButton ? (
              <Button
                startIcon={<ContentPasteGoIcon />}
                variant='contained'
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    setValidateUuid(text);
                    runUuidValidation(text);
                  }
                }}
              >
                Paste
              </Button>
            ) : null}
            <Button
              startIcon={<ClearIcon />}
              variant='contained'
              sx={{ mr: 0, ml: 'auto' }}
              onClick={() => {
                setValidateUuid('');
                setValidateResult('');
                setValidateError(false);
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        width={550}
        maxWidth='100%'
      >
        <Typography
          textAlign='center'
          variant='h6'
          component='h2'
          mb={1}
        >
          About UUIDs
        </Typography>
        <Typography paragraph>
          A Universally Unique Identifier (UUID) is a 128-bit number
          used as a unique identifier.
        </Typography>
        <Typography paragraph>
          UUID v1 is pseudorandom, created using the time of creation
          and the MAC address of the computer that created it.
        </Typography>
        <Typography paragraph>
          UUID v3 is an MD5 hash, created using a namespace and a name.
          The namespace must be a UUID, and the name can be any string.
          Given the same namespace and name, you will always get the
          same UUID.
        </Typography>
        <Typography paragraph>
          UUID v4 is random or pseudorandom, depending on how it is
          generated. The version 4 UUIDs produced by this tool are
          cryptographically-strong random values.
        </Typography>
        <Typography paragraph>
          UUID v5 is a SHA-1 hash, created using a namespace and a name.
          Much like v3 UUIDs, given the same namespace and name, you
          will always get the same UUID. The namespace for v5 UUIDs can
          either be a UUID, or a preset namespace type (URL, DNS, ISO
          OID, and X.500 DN), this tool does not currently support ISO
          OID or X.500 DN.
        </Typography>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          variant='filled'
          severity={alertSeverity as 'success' | 'error'}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
}
