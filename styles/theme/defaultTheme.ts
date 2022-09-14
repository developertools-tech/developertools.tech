import { indigo } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';

const defaultTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: indigo[200],
    },
  },
  typography: {
    fontFamily: 'JetBrains Mono, Menlo, monospace',
  },
};

export default defaultTheme;
