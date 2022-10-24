// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../i18n';

const renderWithI18n = (component: React.ReactElement) =>
  render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);

export default renderWithI18n;
