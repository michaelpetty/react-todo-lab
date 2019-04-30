import React, {Component} from 'react';
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
