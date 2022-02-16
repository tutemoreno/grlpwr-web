import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import esLocale from 'date-fns/locale/es';
import store from './store/index.js';
import { AppRouter } from './routers';
import { AuthProvider, SnackbarProvider } from './context';
import { CssBaseline, useMediaQuery, Box } from '@mui/material';
import { Navbar } from './components';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from './styles/theme';

export default function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      components: {
        MuiButton: {
          defaultProps: {
            variant: 'outlined',
            fullWidth: true,
            size: isMobile ? 'small' : 'medium',
          },
        },
        MuiTextField: {
          defaultProps: {
            variant: 'outlined',
            fullWidth: true,
            size: isMobile ? 'small' : 'medium',
          },
        },
        MuiCheckbox: {
          defaultProps: {
            size: isMobile ? 'small' : 'medium',
          },
        },
      },
    }));
  }, [isMobile]);

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
        <AuthProvider>
          <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <SnackbarProvider>
                <Box height="100vh" bgcolor={theme.palette.common.black}>
                  <Navbar />
                  <AppRouter />
                </Box>
              </SnackbarProvider>
            </ThemeProvider>
          </>
        </AuthProvider>
      </LocalizationProvider>
    </Provider>
  );
}

// function
