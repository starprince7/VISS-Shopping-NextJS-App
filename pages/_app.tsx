import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { store } from "../store";
import { lightTheme } from "../theme";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
