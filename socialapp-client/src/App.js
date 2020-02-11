import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signout from "./pages/Signout";
import isAuthenticated from "./util/isAuthenticated";

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
    let signupPage = (props) => (
          this.state.authenticated 
          ? <Redirect to="/" {...props}/> 
          : <Signup {...props} isAuthenticated={this.isAuthenticated}/>
        );
    let loginPage = (props) => (
          this.state.authenticated 
          ? <Redirect to="/" {...props}/>  
          : <Login {...props} isAuthenticated={this.isAuthenticated}/>
        );
    let signout = (props) => (
          !this.state.authenticated
          ? <Redirect to="/" {...props}/>
          : <Signout {...props} isAuthenticated={this.isAuthenticated}/>
    );

    return (
        <Router> 
          <ThemeProvider theme={theme}>
            <NavBar authenticated={this.state.authenticated} username={this.state.username}/>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props}/>} />
                <Route exact path="/signup" render={ signupPage } />}
                <Route exact path="/login" render={ loginPage } />}
                <Route exact path="/signout" render={ signout } />}
            </Switch>
            </ThemeProvider>
        </Router>
    );
  }
}

export default App;
