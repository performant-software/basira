// @flow

import React from 'react';
import { RouterHistory, withRouter } from 'react-router-dom';
import {
  Button, Container, Message
} from 'semantic-ui-react';
import withMenuBar from '../../hooks/MenuBar';

import type { Translateable } from '../../types/Translateable';

type Props = Translateable & {
  history: typeof RouterHistory,
};

const AdminNotFound = (props: Props) => (
  <Container>
    <Message negative>
      <Message.Header content={props.t('AdminNotFound.errors.notFound')} />
      <Message.Content>{props.t('AdminNotFound.messages.notFound')}</Message.Content>
    </Message>
    <Button
      basic
      content={props.t('AdminNotFound.buttons.back')}
      onClick={() => props.history.go(-2)}
    />
  </Container>
);

export default withRouter(withMenuBar(AdminNotFound));
