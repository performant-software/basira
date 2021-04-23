// @flow

import React, { useState } from 'react';
import { LoginModal } from 'react-components';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';
import Authentication from '../services/Authentication';
import Session from '../services/Session';
import './Home.css';

import type { Translateable } from '../types/Translateable';
import type { Routeable } from '../types/Routeable';

type Props = Routeable & Translateable;

const Home = (props: Props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginFailed, setLoginFailed] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <div
      className='home'
    >
      <Container
        text
      >
        <Segment
          basic
        >
          <Header
            content={props.t('Common.title')}
            inverted
            size='huge'
            subheader={props.t('Home.subtitle')}
          />
          <Button
            basic
            onClick={() => setModal(true)}
            inverted
            size='big'
          >
            { props.t('Home.buttons.login') }
            <Icon
              name='arrow alternate circle right outline'
            />
          </Button>
        </Segment>
      </Container>
      <LoginModal
        disabled={!(username && password)}
        loginFailed={loginFailed}
        onClose={() => {
          setLoginFailed(false);
          setModal(false);
        }}
        onLogin={() => (
          Authentication
            .login(username, password)
            .then((response) => {
              Session.create(response);
              props.history.push('/admin');
            })
            .catch(() => {
              setLoginFailed(true);
              Session.destroy();
            })
        )}
        onPasswordChange={(e, { value }) => setPassword(value)}
        onUsernameChange={(e, { value }) => setUsername(value)}
        open={modal}
      />
    </div>
  );
};

export default withTranslation()(withRouter(Home));
