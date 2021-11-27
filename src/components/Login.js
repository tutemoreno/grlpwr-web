import { Eye, EyeOff } from 'mdi-material-ui';
import React, { useState } from 'react';
import { useAlert, useAuth } from '../context';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import { useFormState } from '../hooks';

const initialState = {
  username: '',
  password: '',
  remember: false,
};

export default function Login() {
  const { content, onChange, onCheckboxChange } = useFormState(initialState);
  const { username, password, remember } = content;
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const { openAlert } = useAlert();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const loggedIn = await auth.signIn(content);

      if (loggedIn) window.scroll({ top: 0, behavior: 'smooth' });
      else openAlert('Usuario/Contraseña incorrectos', 'error');
    } catch (error) {
      openAlert('Error de comunicación', 'error');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 2 }} elevation={24}>
        <form onSubmit={signIn}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="username"
                label="Usuario"
                name="username"
                type="username"
                value={username}
                onChange={onChange}
                autoComplete="username"
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
                onChange={onChange}
                autoComplete="current-password"
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
              <FormControlLabel
                sx={{ ml: 1 }}
                control={
                  <Checkbox
                    name="remember"
                    checked={remember}
                    onChange={onCheckboxChange}
                    color="primary"
                  />
                }
                name="remember"
                label="Recordarme"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="primary">
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
