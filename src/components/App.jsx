import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HelloWorld from './HelloWorld';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Route path='/' exact component={HelloWorld} />
      </Router>
    );
  }
}

export default App;
