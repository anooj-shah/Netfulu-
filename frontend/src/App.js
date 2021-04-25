import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SessionPage from './components/SessionPage';
import Onboarding from './components/Onboarding';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/session/:sessionId' component={SessionPage} />
        <Route exact path='/onboarding' component={Onboarding} />
      </Switch>
    </Router>
  );
}

export default App;