import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SessionPage from './components/SessionPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/session/:sessionId' component={SessionPage} />
      </Switch>
    </Router>
  );
}

export default App;