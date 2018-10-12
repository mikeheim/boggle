import React, { Component } from 'react';
import './App.css';
import BoggleContainer from './components/BoggleContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1 className="App-title">Lets play boggle!</h1>
      </header>
      <BoggleContainer />
    </div>
    );
  }
}

export default App;
