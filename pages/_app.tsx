import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate

import { store, persistor } from "../store";
import { lightTheme } from "../theme";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import NavigationLoader from "../components/NavigationLoader";
import SessionProvider from "../context/session-provider";

const qClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={qClient}>
      <SessionProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={lightTheme}>
              <Component {...pageProps} />
              <ToastContainer />
              <NavigationLoader />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
