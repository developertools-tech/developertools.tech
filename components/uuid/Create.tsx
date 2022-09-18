import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SelectInput from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { v1, v3, v4, v5, validate } from 'uuid';

import useLocalState from '../../hooks/useLocalState';
import type { ToastProps } from '../Toast';

export interface UuidCreateProps {
  setToastMessage: (_message: string) => void;
  setToastSeverity: (_severity: ToastProps['severity']) => void;
  setToastOpen: (_open: boolean) => void;
}

export default function UuidCreate({
  setToastMessage,
  setToastSeverity,
  setToastOpen,
}: UuidCreateProps) {
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
  const [name, setName] = useLocalState<string>({
    key: 'uuidName',
    defaultValue: '',
  });
  const [uuid, setUuid] = useState<string>('');
  const [namespaceError, setNamespaceError] = useState<boolean>(false);

  const createUuid = useCallback(() => {
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
  }, [uuidVersion, namespace, namespaceType, name]);

  useEffect(() => {
    createUuid();
  }, [uuidVersion, namespace, namespaceType, name, createUuid]);

  return (
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
            onChange={(event) => setNamespaceType(event.target.value)}
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
          label='Namespace UUID'
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
          label='UUID Name'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      ) : null}
      <TextField
        label='Generated UUID'
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
            onClick={createUuid}
          >
            New UUID
          </Button>
        ) : (
          <Button
            data-testid='generate-uuid-clear-btn'
            startIcon={<ClearIcon />}
            disabled={!namespace && !name}
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
          disabled={!uuid}
          sx={{ mr: 0, ml: 'auto' }}
          onClick={() => {
            navigator.clipboard.writeText(uuid).then(
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
  );
}
