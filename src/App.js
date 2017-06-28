import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numberOne: 0,
      numberTwo: 0,
      finalResult: 0
    };
  }

  testing = (numberOne, numberTwo) => {
    this.setState({
      finalResult: parseInt(numberOne) + parseInt(numberTwo)
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClick = (event) => {
    this.testing(this.state.numberOne, this.state.numberTwo);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <form>
          <label>
            A:
          <input type="number" name="numberOne" value={this.state.numberOne} onChange={this.handleChange} />
          </label>
        </form>

        <form>
          <label>
            B:
          <input type="number" name="numberTwo" value={this.state.numberTwo} onChange={this.handleChange} />
          </label>
        </form>

        <button onClick={this.handleClick}>
          clica vei
          </button>

        <p>{this.state.numberOne + " + " + this.state.numberTwo}</p>
        <p>{parseInt(this.state.numberOne) + parseInt(this.state.numberTwo)}</p>
        <p>{"testing: " + this.state.finalResult}</p>

      </div>
    );
  }
}

export default App;
