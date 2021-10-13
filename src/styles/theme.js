import { esES as coreEsES } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

export default createTheme(
  {
    palette: {
      mode: 'dark',
      deepPurple,
    },
  },
  coreEsES,
);
