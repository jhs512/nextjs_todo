import { CacheProvider } from "@emotion/react";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import PropTypes from "prop-types";
import * as React from "react";
import { RecoilRoot } from "recoil";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";
import { useSsrComplectedState } from "../states";
import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const colorKeys = [
  "background",
  "common",
  "error",
  "grey",
  "info",
  "primary",
  "secondary",
  "success",
  "text",
  "warning",
];

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    const r = window.document.querySelector(":root");

    colorKeys.forEach((color) => {
      const themeColorObj = theme.palette[color];
      for (const key in themeColorObj) {
        if (Object.hasOwnProperty.call(themeColorObj, key)) {
          const colorVal = themeColorObj[key];
          r.style.setProperty(`--mui-color-${color}-${key}`, colorVal);
        }
      }
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <RecoilRoot>
            <MyAppInner>
              <Component {...pageProps} />
            </MyAppInner>
          </RecoilRoot>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

function MyAppInner({ children }) {
  const setSsrCompleted = useSsrComplectedState();
  React.useEffect(setSsrCompleted, []);

  return children;
}
