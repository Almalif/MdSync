import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import File from './pages/file/file';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/file/:id" component={File} />
      </Switch>
    </Router>
  );
};

export default withTranslation()(App);
