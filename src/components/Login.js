import { Eye, EyeOff } from 'mdi-material-ui';
import React, { useState } from 'react';
import { SwitchTransition } from 'react-transition-group';
import { useAlert, useAuth } from '../context';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  FormControlLabel,
  Grid,
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

export default function Login() {
  const [state, setState] = useState(initialState),
    { email, password, passwordConfirm, remember } = state;
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState('UP');
  const auth = useAuth();
  const { openAlert } = useAlert();

  const modeState =
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
        };

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const loggedIn = await auth.signIn(state);

      if (loggedIn) window.scroll({ top: 0, behavior: 'smooth' });
      else openAlert('Usuario/Contraseña incorrectos', 'error');
    } catch (error) {
      console.log(error);
      openAlert('Error de comunicación', 'error');
    }
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
                  label="Email"
                  name="email"
                  value={email}
                  setState={setState}
                  autoComplete="email"
                  autoFocus
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
                  <Collapse key={mode} timeout={500}>
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
                  </Collapse>
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
