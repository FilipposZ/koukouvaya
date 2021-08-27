import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MenuPage from './components/MenuPage';
import PartyPage from './components/PartyPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#bfadcb'
    },
    secondary: {
      main: '#adcbbf',
    },
    tertiary: {
      dark: '#cbb7ad',
      main: '#b49789'
    },
    textSecondary: {
      main: '#505050'	
    }
  },
  typography: {
    fontFamily: ['Roboto', 'Pecita', 'sans-serif'].join(', '),
    h1: {
      fontSize: 46,
      fontFamily: 'Pecita, sans-serif',
      fontWeight: 700,
      letterSpacing: 8
    },
    subtitle1: {
      fontSize: 24,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400
    },
    subtitle2: {
      fontSize: 20,
      fontFamily: 'Salonikia, sans-serif',
      fontWeight: 400,
    },
    h2: {
      fontSize: 32,
      letterSpacing: 2,
      fontFamily: 'Pecita, sans-serif',
      fontWeight: 600,
      fontStyle: 'italic',
    },
    h3: {
      fontSize: 28,
      letterSpacing: 2,
      fontFamily: 'Salonikia, sans-serif',
      fontWeight: 400,
      fontStyle: 'italic'
    },
    h4: {
      fontSize: 28,
      letterSpacing: 2,
      fontFamily: 'Pecita, sans-serif',
      fontWeight: 500,
      fontStyle: 'italic'
    },
    body1: {
      fontSize: 18,
      letterSpacing: 1.5,
      fontFamily: 'Salonikia, sans-serif',
      fontWeight: 400
    },
    body2: {
      fontSize: 20,
      letterSpacing: 1.5,
      fontFamily: 'Pecita, sans-serif',
      fontWeight: 600
    },
    caption: {
      fontSize: 16,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 300
    },
    button: {
      textTransform: 'none'
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MenuPage} />
          <Route path="/party" component={PartyPage} />
        </Switch>
      </BrowserRouter>

    </ThemeProvider>
  );
}
