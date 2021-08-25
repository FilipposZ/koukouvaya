import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core/styles';

import Menu from './components/Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7dbca9'
    },
    secondary: {
      main: '#e18437',
      // light: '#fce9f4'
    },
    tertiary: {
      dark: '#767d6e',
      main: '#eefadc'
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
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      color: '#858999'
    },
    h2: {
      fontSize: 26,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontSize: 28,
      letterSpacing: 2,
      fontFamily: 'Pecita, sans-serif',
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
      fontSize: 20,
      letterSpacing: 1.5,
      fontFamily: 'Salonikia, sans-serif',
      fontWeight: 400
    },
    body2: {
      fontSize: 20,
      letterSpacing: 1.5,
      fontFamily: 'Pecita, sans-serif',
      fontWeight: 400
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
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Menu />
          </Route>
        </Switch>
      </BrowserRouter>

    </ThemeProvider>
  );
}
