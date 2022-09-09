import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SelectInput from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import {
  // parse,
  // stringify,
  v1,
  v3,
  v4,
  v5,
  validate,
  // version,
} from 'uuid';

import Heading from '../components/Heading';
import Layout from '../components/Layout';

// TODO: validate, parse, stringify, version
export default function UuidPage() {
  const [version, setVersion] = useState<number>(4);
  const [uuid, setUuid] = useState<string>('');
  const [namespace, setNamespace] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [namespaceType, setNamespaceType] = useState<string>('custom');
  const [namespaceError, setNamespaceError] = useState<boolean>(false);

  function createUuid() {
    switch (version) {
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
          !name ||
          !validate(namespace)
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

  useEffect(() => {
    createUuid();
  }, [version, namespace, namespaceType, name]);

  return (
    <Layout title='UUID'>
      <Heading>UUID</Heading>
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
        width={350}
        maxWidth='100%'
      >
        <FormControl fullWidth>
          <InputLabel id='version-label'>UUID Version</InputLabel>
          <SelectInput
            fullWidth
            labelId='version-label'
            value={version}
            label='UUID Version'
            onChange={(event) => setVersion(Number(event.target.value))}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </SelectInput>
        </FormControl>
        {version === 5 ? (
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
        {version === 3 ||
        (version === 5 && namespaceType === 'custom') ? (
          <TextField
            label='Namespace'
            value={namespace}
            error={namespaceError}
            helperText={namespaceError ? 'Invalid UUID' : ''}
            onChange={(event) => {
              setNamespace(event.target.value);
              setNamespaceError(
                !validate(event.target.value) && !!event.target.value,
              );
            }}
          />
        ) : null}
        {version === 3 || version === 5 ? (
          <TextField
            label='Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        ) : null}
        <TextField
          label='UUID'
          value={uuid}
          fullWidth
        />
        {version !== 5 && version !== 3 ? (
          <Button
            variant='contained'
            onClick={createUuid}
          >
            New UUID
          </Button>
        ) : null}
      </Box>
    </Layout>
  );
}
