import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { debounce } from 'lodash';
import {
  CheckboxMarkedCircleOutline,
  CloseCircleOutline,
  Eye,
  EyeOff,
} from 'mdi-material-ui';
import React, { useCallback, useMemo, useState } from 'react';
import { SwitchTransition } from 'react-transition-group';
import { useAlert, useAuth } from '../context';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from './';

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  remember: false,
};

const initialEmailState = {
  helperText: '',
  error: false,
};

const { REACT_APP_ACCOUNTS_SERVICE } = process.env;

export default function Login() {
  const { palette } = useTheme();
  const [state, setState] = useState(initialState),
    { email, password, passwordConfirm, remember } = state;
  const [showPassword, setShowPassword] = useState(false);
  const [emailState, setEmailState] = useState(initialEmailState);
  const [mode, setMode] = useState('IN');
  const auth = useAuth();
  const { openAlert } = useAlert();

  const modeState = useMemo(
    () =>
      mode == 'IN'
        ? {
            signUpMode: false,
            passwordAutocomplete: 'current-password',
            submitLabel: 'Iniciar sesión',
            switchLabel: 'Crear usuario',
          }
        : {
            signUpMode: true,
            passwordAutocomplete: 'new-password',
            submitLabel: 'Crear usuario',
            switchLabel: 'Ya tengo usuario',
          },
    [mode],
  );

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const loggedIn = await auth.signIn(state);

      if (loggedIn) window.scroll({ top: 0, behavior: 'smooth' });
      else openAlert('Usuario/Contraseña incorrectos', 'error');
    } catch (error) {
      openAlert('Error de comunicación', 'error');
    }
  };

  const validateEmail = useCallback(async (e) => {
    if (e.target.value == '') setEmailState(initialEmailState);
    else {
      const emailInput = document.querySelector('#email');
      console.log('validation', emailInput.checkValidity());

      if (emailInput.checkValidity()) {
        const {
          data: { available, notifications },
        } = await checkEmailAvailability(email);

        setEmailState({
          error: available,
          helperText: notifications[0].message,
        });
      } else {
        console.log('invalid');
        setEmailState({
          error: true,
          helperText: 'Invalid email',
        });
      }
    }
  }, []);

  const emailAdornment = () => {
    if (modeState.signUpMode && emailState.helperText.length) {
      return (
        <InputAdornment position="start">
          <Box p={0.5} display="flex">
            {emailState.error ? (
              <CloseCircleOutline color="error" />
            ) : (
              <CheckboxMarkedCircleOutline
                htmlColor={palette.success[palette.type]}
              />
            )}
          </Box>
        </InputAdornment>
      );
    } else return null;
  };

  return (
    <Container disableGutters maxWidth="xs">
      <Box clone p={2}>
        <Paper elevation={24}>
          <form onSubmit={signIn}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  setState={setState}
                  onChange={debounce(validateEmail, 500)}
                  autoComplete="email"
                  autoFocus
                  {...emailState}
                  InputProps={{
                    endAdornment: emailAdornment(),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="password"
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  setState={setState}
                  autoComplete={modeState.passwordAutocomplete}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="primary"
                          tabIndex={-1}
                          onClick={() => setShowPassword((value) => !value)}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <SwitchTransition>
                  <Grow key={mode} timeout={500}>
                    {modeState.signUpMode ? (
                      <TextField
                        required={modeState.signUpMode}
                        name="passwordConfirm"
                        label="Confirmar contraseña"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordConfirm}
                        setState={setState}
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                color="primary"
                                tabIndex={-1}
                                onClick={() =>
                                  setShowPassword((value) => !value)
                                }
                              >
                                {showPassword ? <Eye /> : <EyeOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="remember"
                            checked={remember}
                            setState={setState}
                            color="primary"
                          />
                        }
                        name="remember"
                        label="Recordarme"
                      />
                    )}
                  </Grow>
                </SwitchTransition>
              </Grid>
              {/* <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="remember"
                      checked={remember}
                      setState={setState}
                      color="primary"
                    />
                  }
                  name="remember"
                  label="Recordarme"
                />
              </Grid> */}
              <Grid item xs={12}>
                <Button type="submit" color="primary">
                  {modeState.submitLabel}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="secondary"
                  onClick={() =>
                    setMode((mode) => (mode == 'IN' ? 'UP' : 'IN'))
                  }
                >
                  {modeState.switchLabel}
                </Button>
              </Grid>
              {/* <Grid item xs={12}>
                  <Link href="#" variant="body2">
                    Olvidé mi contraseña
                  </Link>
                  </Grid> */}
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

async function checkEmailAvailability(email) {
  return await axios({
    method: 'post',
    url: `${REACT_APP_ACCOUNTS_SERVICE}/checkEmailAvailability`,
    data: { email },
  });
}
