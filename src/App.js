import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import TheRoutes from './config/routes';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        {TheRoutes}
      </div>
    )
  }
}
export default App;
