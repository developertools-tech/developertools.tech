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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(['common', 'uuid']);

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
        {t('uuid:generateUuid')}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id='version-label'>
          {t('uuid:uuidVersion')}
        </InputLabel>
        <SelectInput
          fullWidth
          labelId='version-label'
          value={uuidVersion}
          label={t('uuid:uuidVersion')}
          onChange={(event) =>
            setUuidVersion(Number(event.target.value))
          }
          sx={{ minWidth: 120 }}
        >
          <MenuItem value={1}>{`v1 (${t(
            'uuid:pseudorandom',
          )})`}</MenuItem>
          <MenuItem value={3}>{`v3 (${t('uuid:md5hash')})`}</MenuItem>
          <MenuItem value={4}>{`v4 (${t('uuid:random')})`}</MenuItem>
          <MenuItem value={5}>{`v5 (${t('uuid:sha1Hash')})`}</MenuItem>
        </SelectInput>
      </FormControl>
      {uuidVersion === 5 ? (
        <FormControl fullWidth>
          <InputLabel id='namespace-type-label'>
            {t('uuid:namespaceType')}
          </InputLabel>
          <SelectInput
            fullWidth
            labelId='namespace-type-label'
            value={namespaceType}
            label={t('uuid:namespaceType')}
            onChange={(event) => setNamespaceType(event.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value='custom'>{t('uuid:custom')}</MenuItem>
            <MenuItem value='url'>{t('uuid:url')}</MenuItem>
            <MenuItem value='dns'>{t('uuid:dns')}</MenuItem>
          </SelectInput>
        </FormControl>
      ) : null}
      {uuidVersion === 3 ||
      (uuidVersion === 5 && namespaceType === 'custom') ? (
        <TextField
          label={t('uuid:namespaceUuid')}
          value={namespace}
          error={namespaceError}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9-]*',
          }}
          helperText={namespaceError ? t('uuid:invalidUuid') : ''}
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
          label={t('uuid:uuidName')}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      ) : null}
      <TextField
        label={t('uuid:generatedUuid')}
        value={uuid}
        disabled
        fullWidth
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
            {t('uuid:newUuid')}
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
            {t('common:clear')}
          </Button>
        )}
        <Button
          startIcon={<ContentCopyIcon />}
          disabled={!uuid}
          sx={{ mr: 0, ml: 'auto' }}
          onClick={() => {
            navigator.clipboard.writeText(uuid).then(
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
  );
}
