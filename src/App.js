import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React, { useEffect } from 'react';
import esLocale from 'date-fns/locale/es';
import store from './store/index.js';
import { AppRouter } from './routers';
import { AuthProvider, SnackbarProvider } from './context';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { Navbar } from './components';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles';
import { useDispatch } from 'react-redux';
import { setIsMobile } from './store/appSlice';
import { PropTypes } from 'prop-types';

const AppContent = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [isMobile]);

  return (
    <SnackbarProvider>
      <>
        <Navbar />
        <AppRouter />
      </>
    </SnackbarProvider>
  );
};

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </Provider>
  );
};
AppProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
