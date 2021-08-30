import { Eye, EyeOff } from 'mdi-material-ui';
import React, { useReducer, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '../components';
import { useAlert, useAuth } from '../context';
import { formReducer } from '../hooks';

const initialState = {
  email: '',
  password: '',
  remember: false,
};

export const Login = () => {
  const [content, formDispatch] = useReducer(formReducer, initialState),
    { email, password, remember } = content;
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const { openAlert } = useAlert();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const loggedIn = await auth.signIn(content);

      if (!loggedIn) openAlert('Usuario/Contraseña incorrectos', 'error');
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
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={formDispatch}
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={formDispatch}
                  autoComplete="current-password"
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
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="remember"
                      checked={remember}
                      onChange={formDispatch}
                      color="primary"
                    />
                  }
                  name="remember"
                  label="Remember"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth color="primary">
                  Sign in
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
};
