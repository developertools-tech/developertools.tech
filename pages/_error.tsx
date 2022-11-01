import * as Sentry from '@sentry/nextjs';
import { NextPageContext } from 'next';
import NextErrorComponent from 'next/error';
import React from 'react';

function CustomErrorComponent({ statusCode }: { statusCode: number }) {
  return <NextErrorComponent statusCode={statusCode} />;
}

CustomErrorComponent.getInitialProps = async (
  contextData: NextPageContext,
) => {
  await Sentry.captureUnderscoreErrorException(contextData);
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
