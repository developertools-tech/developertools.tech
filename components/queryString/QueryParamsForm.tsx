import Delete from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';

export type QueryParams = {
  param: string;
  value: string;
  key: string;
}[];
export const defaultParams = [{ param: '', value: '', key: 'initial' }];

export interface QueryParamsFormProps {
  queryParams: QueryParams;
  setQueryParams: (_queryParams: QueryParams) => void;
  setQueryString: (_queryString: string) => void;
}

export function getQueryString(
  queryParams: QueryParams,
  setQueryString: (_queryString: string) => void,
) {
  const params = new URLSearchParams();
  queryParams.forEach((param) => {
    if (param.param !== '') {
      params.set(param.param, param.value);
    }
  });
  setQueryString(params.toString());
}

export default function QueryParamsForm({
  queryParams,
  setQueryParams,
  setQueryString,
}: QueryParamsFormProps) {
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
    getQueryString(newParams, setQueryString);
  }

  function deleteRow(event: React.MouseEvent, row: number) {
    event.preventDefault();
    const newParams: QueryParams = queryParams.filter(
      (_x, i) => i !== row,
    );
    setQueryParams(newParams);
    getQueryString(newParams, setQueryString);
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
              label='Parameter'
              name={`param${i}`}
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
              label='Value'
              name={`value${i}`}
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
                <Delete
                  style={{ cursor: 'pointer' }}
                  onClick={(event) => deleteRow(event, i)}
                />
              </div>
            </Grid>
          ) : (
            ''
          )}
        </React.Fragment>
      ))}
      {/* <Button
            startIcon={<ClearIcon />}
            disabled={!queryParams}
            onClick={() => {
              setQueryString('');
              setQueryParams([]);
            }}
          >
            {t('common:clear')}
          </Button> */}
    </Grid>
  );
}
