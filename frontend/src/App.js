import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SessionPage from './components/SessionPage';
import Onboarding from './components/Onboarding';
import RecsPage from './components/RecsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/session/:sessionId' component={SessionPage} />
        <Route exact path='/onboarding/:sessionId/:username' component={Onboarding} />
        <Route exact path='/recs/:sessionId/:username' component={RecsPage} />

      </Switch>
    </Router>
  );
}

export default App;