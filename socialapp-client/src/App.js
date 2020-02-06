import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// MUI imports
import Container from "@material-ui/core/Container";
import { ThemeProvider } from '@material-ui/core/styles';
import CreateMuiTheme from "@material-ui/core/styles/createMuiTheme";
import './App.css';

const theme = CreateMuiTheme({
    palette: {
      primary: {
        main: '#4fc3f7',
        light: '#8bf6ff',
        dark: '#0093c4',
        contrastText: '#000',
      },
      secondary: {
        main: '#ffcdd2',
        light: '#ffffff',
        dark: '#cb9ca1',
        contrastText: '#000'
      },
    },
    typography: {
      useNextVariants: true
    }
  });

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
            <NavBar />
            <Switch>
              <Container maxWidth="sm">
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
              </Container>
            </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
