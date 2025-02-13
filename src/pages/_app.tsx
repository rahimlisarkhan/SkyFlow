import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import 'antd/dist/reset.css';
import theme from '@/common/theme/themeConfig';
import { store } from '@/common/store';
import { Provider } from 'react-redux';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ConfigProvider>
);

export default App;
