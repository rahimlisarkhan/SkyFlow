import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import 'antd/dist/reset.css';
import theme from '@/theme/themeConfig';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;
