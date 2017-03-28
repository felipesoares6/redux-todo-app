import React from 'react';
import { Component } from 'React';

class App extends Component {
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <h1> hi {this.props.name} </h1>
      </div>
    );
  }
}

export default App;
