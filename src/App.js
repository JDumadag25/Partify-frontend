import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Partify from './components/Partify'
import Home from './components/Home'
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from 'react-router-dom';


class App extends Component {

  login = (username, password, callback) => {
    fetch('http://localhost:3000/sessions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password })})
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user_id', json.user_id);
        localStorage.setItem('username', json.username);

        callback("/partyroom");
      });
  }
  render() {
    return (
      <Router>
          <Switch>
        <Route exact path="/" component={Home} />

        <Route path="/login" render={(props) => <Login submitLabel="Login" onSubmit={this.login} {...props} />} />
        <Route path="/register" render={(props) => <Register submitLabel="Register" onSubmit={this.register} {...props} />} /> 

        {
          localStorage.getItem('token') ?
            <Route path="/partify" render={(props) => <Partify {...props} />} />
          :
            <Redirect to="/login" />
        }
      </Switch>
        </Router>

    );
  }
}

export default App;
