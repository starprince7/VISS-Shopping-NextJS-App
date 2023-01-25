import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import "../styles/globals.css";
import { store } from "../store";
import { lightTheme } from "../theme";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
