// @flow

import { useDragDrop } from '@performant-software/shared-components';
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Artwork from './pages/Artwork';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Document from './pages/Document';
import Home from './pages/Home';
import NotFound404 from './pages/404';
import Person from './pages/Person';
import PhysicalComponent from './pages/PhysicalComponent';
import Place from './pages/Place';
import Search from './pages/Search';
import VisualContext from './pages/VisualContext';
import './App.css';

const App = () => (
  <Router>
    <Route
      path='/'
      component={Search}
      exact
    />
    <Route
      exact
      path='/login'
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
    <Route
      path='/people/:id'
      component={Person}
    />
    <Route
      path='/physical_components/:id'
      component={PhysicalComponent}
    />
    <Route
      path='/places/:id'
      component={Place}
    />
    <Route
      path='/visual_contexts/:id'
      component={VisualContext}
    />
    <Route
      path='/404'
      component={NotFound404}
    />
    <AuthenticatedRoute
      path='/admin'
      component={Admin}
    />
  </Router>
);

export default useDragDrop(App);
