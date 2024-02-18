import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

// Tanstack Query Import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from "../store";
import { lightTheme } from "../theme";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const qClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={qClient}>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
