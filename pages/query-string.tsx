import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { Namespace, useTranslation } from 'react-i18next';

import Layout from '../components/Layout';
import {
  defaultParams,
  QueryParams,
} from '../components/queryString/QueryParamsForm';
import QueryStringForm from '../components/queryString/QueryStringForm';
import Toast, { ToastProps } from '../components/Toast';
import useLocalState from '../hooks/useLocalState';
import nextI18NextConfig from '../next-i18next.config.js';

export default function QueryStringPage() {
  const [queryString, setQueryString] = useLocalState<string>({
    key: 'queryString',
    defaultValue: '',
  });
  const [queryParams, setQueryParams] = useLocalState<QueryParams>({
    key: 'queryParams',
    defaultValue: defaultParams,
  });

  const [error, setError] = React.useState('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] =
    useState<ToastProps['severity']>('success');
  const { t } = useTranslation('queryString');
  return (
    <Layout title='Query String'>
      <Typography paragraph>{t('description')}</Typography>
      <QueryStringForm
        queryString={queryString}
        setQueryString={setQueryString}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        error={error}
        setError={setError}
        setToastMessage={setToastMessage}
        setToastOpen={setToastOpen}
        setToastSeverity={setToastSeverity}
      />
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Layout>
  );
}

const i18nextNameSpaces: Namespace[] = ['common', 'queryString'];

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
