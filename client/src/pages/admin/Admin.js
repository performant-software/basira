// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import {
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import {
  Button,
  Icon,
  Menu,
  Segment
} from 'semantic-ui-react';
import Artwork from './Artwork';
import Artworks from './Artworks';
import Authentication from '../../services/Authentication';
import People from './People';
import Places from './Places';
import Session from '../../services/Session';
import Users from './Users';
import ValueLists from './ValueLists';
import './Admin.css';

import type { Routeable } from '../../types/Routeable';
import type { Translateable } from '../../types/Translateable';

type Props = Routeable & Translateable;

const Admin = (props: Props) => (
  <div
    className='admin'
  >
    <Segment
      inverted
    >
      <Menu
        inverted
        secondary
      >
        <Menu.Item
          header
        >
          <Icon
            name='paint brush'
          />
          <Menu.Header
            content={props.t('Common.title')}
          />
        </Menu.Item>
        <Menu.Menu
          style={{
            paddingLeft: '4em'
          }}
        >
          <Menu.Item
            active={!!props.location.pathname.match('/admin/artworks')}
            as={Link}
            content={props.t('Admin.menu.artworks')}
            to='/admin/artworks'
          />
          <Menu.Item
            active={!!props.location.pathname.match('/admin/people')}
            as={Link}
            content={props.t('Admin.menu.people')}
            to='/admin/people'
          />
          <Menu.Item
            active={!!props.location.pathname.match('/admin/places')}
            as={Link}
            content={props.t('Admin.menu.places')}
            to='/admin/places'
          />
          <Menu.Item
            active={!!props.location.pathname.match('/admin/value_lists')}
            as={Link}
            content={props.t('Admin.menu.valueLists')}
            to='/admin/value_lists'
          />
          <Menu.Item
            active={!!props.location.pathname.match('/admin/users')}
            as={Link}
            content={props.t('Admin.menu.users')}
            to='/admin/users'
          />
        </Menu.Menu>
        <Menu.Item
          position='right'
        >
          <Button
            basic
            content={props.t('Admin.buttons.logout')}
            icon='logout'
            inverted
            onClick={() => (
              Authentication
                .logout()
                .then(() => {
                  Session.destroy();
                  props.history.push('/');
                })
            )}
          />
        </Menu.Item>
      </Menu>
    </Segment>
    <Switch>
      <Route
        path='/admin/artworks/:id'
        component={Artwork}
      />
      <Route
        path='/admin/artworks'
        component={Artworks}
      />
      <Route
        path='/admin/people'
        component={People}
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
        path='/admin/users'
        component={Users}
      />
      <Redirect
        to='/admin/artworks'
      />
    </Switch>
  </div>
);

export default withTranslation()(withRouter(Admin));
