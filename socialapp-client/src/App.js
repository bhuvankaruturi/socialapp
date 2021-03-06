import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/layout/NavBar";
import axios from 'axios';
import isAuthenticated from "./util/isAuthenticated";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signout from "./pages/Signout";
import User from "./pages/User";

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

axios.defaults.baseURL = 'https://us-central1-socialapp-5380a.cloudfunctions.net/api';

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
                <Route exact path="/signup" render={ (props) => <Signup {...props}/> } />
                <Route exact path="/login" render={ (props) => <Login {...props} /> } />
                <Route exact path="/signout" render={ (props) => <Signout {...props}/> } />
                <Route path="/user/:username" render={ (props) => <User key={props.match.params.username} {...props}/>} />
                <Route path="/user/:username/post/:postId" render={ (props) => <User key={props.match.params.postId} {...props}/>} />
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
