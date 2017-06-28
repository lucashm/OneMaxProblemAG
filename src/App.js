import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      test: 2
    };
  }

  testing = (a) => {
    this.setState({
      test: a
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <button onClick={() => this.testing(5)}>
          Click me
        </button>

        <p>{this.state.test}</p>


      </div>
    );
  }
}

export default App;
