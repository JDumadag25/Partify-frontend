import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import {BrowserRouter as Router} from 'react-router-dom' 

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PARTIFIED</h1>
        </header>
        <div className="App-intro">
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
