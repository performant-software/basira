// @flow

import React from 'react';
import { useDragDrop } from 'react-components';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Artwork from './pages/Artwork';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Document from './pages/Document';
import Home from './pages/Home';
import './App.css';

const App = () => (
  <Router>
    <Route
      exact
      path='/'
    >
      <Home
        images={6}
      />
    </Route>
    <Route
      path='/artworks/:id'
      component={Artwork}
    />
    <Route
      path='/documents/:id'
      component={Document}
    />
    <AuthenticatedRoute
      path='/admin'
      component={Admin}
    />
  </Router>
);

export default useDragDrop(App);
