import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import HelloWorld from './HelloWorld';
import MoneyTime from './MoneyTime';

class App extends PureComponent {
  render() {
    return (
      <Router>
        {/*<Route path='/hello' exact component={HelloWorld} />*/}
        <Route path='/' exact component={MoneyTime} />
      </Router>
    );
  }
}

export default App;
