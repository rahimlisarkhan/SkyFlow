import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import nextI18NextConfig from '../../next-i18next.config';

import 'antd/dist/reset.css';
import theme from '@/common/theme/themeConfig';
import { store } from '@/common/store';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';

// import { ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <Provider store={store}>
      <Component {...pageProps} />
      {/* <ToastContainer /> */}
    </Provider>
  </ConfigProvider>
);

export default appWithTranslation(App, nextI18NextConfig);
