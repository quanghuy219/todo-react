import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './Main/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 id="header">todos</h1>
        </header>  
          <Main />
      </div>
    );
  }
}

export default App;
