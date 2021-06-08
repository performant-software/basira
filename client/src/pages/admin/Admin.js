// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import {
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import Artwork from './Artwork';
import Artworks from './Artworks';
import Document from './Document';
import People from './People';
import PhysicalComponent from './PhysicalComponent';
import Places from './Places';
import Users from './Users';
import ValueLists from './ValueLists';
import VisualContext from './VisualContext';
import './Admin.css';

const Admin = () => (
  <Switch>
    <Route
      path='/admin/artworks/new'
      component={Artwork}
    />
    <Route
      path='/admin/artworks/:id'
      component={Artwork}
    />
    <Route
      path='/admin/artworks'
      component={Artworks}
    />
    <Route
      path='/admin/documents/new'
      component={Document}
    />
    <Route
      path='/admin/documents/:id'
      component={Document}
    />
    <Route
      path='/admin/people'
      component={People}
    />
    <Route
      path='/admin/physical_components/new'
      component={PhysicalComponent}
    />
    <Route
      path='/admin/physical_components/:id'
      component={PhysicalComponent}
    />
    <Route
      path='/admin/places'
      component={Places}
    />
    <Route
      path='/admin/value_lists'
      component={ValueLists}
    />
    <Route
      path='/admin/visual_contexts/new'
      component={VisualContext}
    />
    <Route
      path='/admin/visual_contexts/:id'
      component={VisualContext}
    />
    <Route
      path='/admin/users'
      component={Users}
    />
    <Redirect
      to='/admin/artworks'
    />
  </Switch>
);

export default withTranslation()(withRouter(Admin));
