import Delete from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type QueryParams = {
  param: string;
  value: string;
  key: string;
}[];
export const defaultParams = [{ param: '', value: '', key: 'initial' }];

export interface QueryParamsFormProps {
  queryParams: QueryParams;
  queryString: string;
  setQueryParams: (_queryParams: QueryParams) => void;
  setQueryString: (_queryString: string) => void;
}

export function getQueryString(
  queryParams: QueryParams,
  queryString: string,
  setQueryString: (_queryString: string) => void,
) {
  const params = new URLSearchParams();
  queryParams.forEach((param) => {
    if (param.param !== '') {
      params.set(param.param, param.value);
    }
  });
  const url = queryString.includes('?')
    ? `${queryString.split('?')[0]}?`
    : '';
  setQueryString(`${url}${params.toString()}`);
}

export default function QueryParamsForm({
  queryParams,
  queryString,
  setQueryParams,
  setQueryString,
}: QueryParamsFormProps) {
  const { t } = useTranslation(['queryString', 'common']);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: string,
  ) {
    const { value } = event.target;
    const newParams: QueryParams = [...queryParams];
    if (field === 'param') {
      newParams[index].param = value;
    } else {
      newParams[index].value = value;
    }
    if (
      newParams[newParams.length - 1].param !== '' ||
      newParams[newParams.length - 1].value !== ''
    ) {
      newParams.push({
        param: '',
        value: '',
        key: `${new Date().getTime()}`,
      });
    }
    setQueryParams(newParams);
    getQueryString(newParams, queryString, setQueryString);
  }

  function deleteRow(event: React.MouseEvent, row: number) {
    event.preventDefault();
    const newParams: QueryParams = queryParams.filter(
      (_x, i) => i !== row,
    );
    setQueryParams(newParams);
    getQueryString(newParams, queryString, setQueryString);
  }

  return (
    <Grid
      container
      spacing={1}
    >
      {queryParams.map((param, i) => (
        <React.Fragment key={param.key}>
          <Grid
            item
            xs={5}
          >
            <TextField
              label={`${t('queryString:parameter')} ${i + 1}`}
              name={`param${i + 1}`}
              value={param.param}
              onChange={(event) => handleChange(event, i, 'param')}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              label={`{t('queryString:value')} ${i + 1}`}
              name={`value${i + 1}`}
              value={param.value}
              onChange={(event) => handleChange(event, i, 'value')}
              style={{ width: '100%' }}
            />
          </Grid>
          {i !== queryParams.length - 1 ? (
            <Grid
              item
              xs={1}
            >
              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <IconButton
                  type='button'
                  onClick={(event) => deleteRow(event, i)}
                  aria-label={`{t('queryString:deleteRow')} ${i + 1}`}
                >
                  <Delete />
                </IconButton>
              </div>
            </Grid>
          ) : (
            ''
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
}
