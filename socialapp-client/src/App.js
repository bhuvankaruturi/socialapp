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
import {SET_AUTHENTICATED} from './redux/types';
import {signoutUser, getUserData, setLocalStorageToken} from './redux/actions/userActions';

// MUI imports
import { ThemeProvider } from '@material-ui/core/styles';
import CreateMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./util/theme"
import './App.css';

const theme = CreateMuiTheme(themeObject);

class App extends Component {
  componentDidMount() {
    let status = isAuthenticated();
    if (status.authenticated) {
      store.dispatch({type: SET_AUTHENTICATED});
      setLocalStorageToken(status.token);
      store.dispatch(getUserData());
    } else {
      store.dispatch(signoutUser());
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router> 
            <NavBar />
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props}/>} />
                <Route exact path="/signup" render={ (props) => <Signup {...props}/> } />}
                <Route exact path="/login" render={ (props) => <Login {...props} /> } />}
                <Route exact path="/signout" render={ (props) => <Signout {...props}/> } />}
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
