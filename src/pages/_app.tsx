import React, { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ConnectorUtils } from "utils";
import { Web3ReactProvider } from "@web3-react/core";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, GlobalModalProvider } from "context";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { NextPage } from "next";

import theme, { createEmotionCache } from "public/material";
import store from "redux-store";
import MainLayout from "layouts/MainLayout";
import "language";
import "public/styles/index.scss";
import { NetworkConstant } from "const";

declare global {
  interface Window {
    isDebug: boolean;
    ethereum: any;
  }
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: AppPropsWithLayout) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: Element) => page);

  useEffect(() => {
    // Toggle debug mode for development
    window.isDebug = NetworkConstant.isTestnet;
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={ConnectorUtils.getLibrary}>
          <ThemeProvider theme={theme}>
            <GlobalModalProvider>
              <AuthProvider>
                <CssBaseline />
                <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
              </AuthProvider>
            </GlobalModalProvider>
          </ThemeProvider>
        </Web3ReactProvider>
      </Provider>
    </CacheProvider>
  );
};

type MyAppProps = AppProps & {
  Component: Element & { getLayout: CallableFunction };
  emotionCache: EmotionCache;
  pageProps: Record<string, unknown>;
};

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout;
};

export default MyApp;
