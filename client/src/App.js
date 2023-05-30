// @flow

import React from 'react';
import { useDragDrop } from 'react-components';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from './pages/Home';
import './App.css';

const App = () => (
  <Router>
    <Route exact path='/'>
      <Home images={6} />
    </Route>
    <AuthenticatedRoute
      path='/admin'
      component={Admin}
    />
  </Router>
);

export default useDragDrop(App);
