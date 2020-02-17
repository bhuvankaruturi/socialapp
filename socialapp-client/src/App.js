import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signout from "./pages/Signout";
import isAuthenticated from "./util/isAuthenticated";

// redux imports
import {Provider} from "react-redux";
import store from './redux/store';

// MUI imports
import { ThemeProvider } from '@material-ui/core/styles';
import CreateMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./util/theme"
import './App.css';

const theme = CreateMuiTheme(themeObject);

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
        authenticated: isAuthenticated(),
        username: localStorage.getItem('username')
    };
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  isAuthenticated = (authenticated, username) => {
    this.setState({authenticated, username});
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router> 
            <NavBar authenticated={this.state.authenticated} username={this.state.username}/>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props}/>} />
                <Route exact path="/signup" render={ (props) => <Signup {...props} isAuthenticated={this.isAuthenticated}/> } />}
                <Route exact path="/login" render={ (props) => <Login {...props} /> } />}
                <Route exact path="/signout" render={ (props) => <Signout {...props} isAuthenticated={this.isAuthenticated}/> } />}
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
