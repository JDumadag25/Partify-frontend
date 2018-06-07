import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Partify from './components/Partify'
import Home from './components/Home'
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from 'react-router-dom';


class App extends Component {

  state= {
    errors: [],
    
  }

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
        if(json.token){
        localStorage.setItem('token', json.token);
        localStorage.setItem('user_id', json.user_id);
        localStorage.setItem('username', json.username);

        callback("/partyroom");
      } else {
        this.setState({errors: [json.errors]})
      }
      });
  }

  register = (username, password, callback) => {
    fetch('http://localhost:3000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password })})
      .then(res => res.json())
      .then(json => {
        if(json.token){
        localStorage.setItem('token', json.token);
        localStorage.setItem('user_id', json.user_id);
        localStorage.setItem('username', json.username);

        callback("/partyroom");
      } else {
        console.log(json.errors);
        this.setState({errors:[json.errors]})
      }
      });
  }

    // TODO: Add a logout button somewhere and call this.
  logout = () => {
    // You'll want to use:
    //   localStorage.removeItem('key')
  }
  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/login" render={(props) => <Login submitLabel="Login" onSubmit={this.login} {...props} errors={this.state.errors} />} />

          <Route path="/register" render={(props) => <Register submitLabel="Register" onSubmit={this.register} {...props} errors={this.state.errors}/>} />

          { localStorage.getItem('token') ? <Route path="/partyroom" render={(props) => <Partify {...props} />} /> : <Redirect to="/login" /> }
        </Switch>
      </Router>

    );
  }
}

export default App;
