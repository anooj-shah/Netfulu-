import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/home' component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;