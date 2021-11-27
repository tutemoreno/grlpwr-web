import { esES as coreEsES } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import { deepPurple, pink } from '@mui/material/colors';

export default createTheme(
  {
    palette: {
      mode: 'dark',
      deepPurple,
      pink,
    },
  },
  coreEsES,
);
