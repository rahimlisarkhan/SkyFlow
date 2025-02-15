import React from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import nextI18NextConfig from "../../next-i18next.config";

import NextNProgress from "nextjs-progressbar";

import "antd/dist/reset.css";
import "../common/theme/globals.css";

import theme from "@/common/theme/themeConfig";
import { store } from "@/common/store";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";

import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
      <NextNProgress color="#52c418" />
    </Provider>
  </ConfigProvider>
);

export default appWithTranslation(App, nextI18NextConfig);
