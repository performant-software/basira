// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Message, Modal } from 'semantic-ui-react';
import Session from '../services/Session';

import type { EditContainerProps } from '@performant-software/shared-components/types';
import type { Translateable } from '../types/Translateable';
import type { User } from '../types/User';

type Props = EditContainerProps & Translateable & {
  item: User
};

const UserModal = (props: Props) => (
  <Modal
    as={Form}
    centered={false}
    noValidate
    open
  >
    <Modal.Header
      content={props.item.id
        ? props.t('UserModal.title.edit')
        : props.t('UserModal.title.add')}
    />
    <Modal.Content>
      <Form.Input
        error={props.isError('name')}
        label={props.t('UserModal.labels.name')}
        required={props.isRequired('name')}
        onChange={props.onTextInputChange.bind(this, 'name')}
        value={props.item.name || ''}
      />
      <Form.Input
        error={props.isError('email')}
        label={props.t('UserModal.labels.email')}
        required={props.isRequired('email')}
        onChange={props.onTextInputChange.bind(this, 'email')}
        value={props.item.email || ''}
      />
      { Session.isAdmin() && (
        <Form.Checkbox
          checked={props.item.admin}
          label={props.t('UserModal.labels.admin')}
          onChange={props.onCheckboxInputChange.bind(this, 'admin')}
        />
      )}
      <Message
        content={props.t('UserModal.labels.passwordPolicy.content')}
        header={props.t('UserModal.labels.passwordPolicy.header')}
      />
      <Form.Input
        error={props.isError('password')}
        label={props.t('UserModal.labels.password')}
        required={props.isRequired('password')}
        onChange={props.onTextInputChange.bind(this, 'password')}
        type='password'
        value={props.item.password || ''}
      />
      <Form.Input
        error={props.isError('password_confirmation')}
        label={props.t('UserModal.labels.passwordConfirmation')}
        required={props.isRequired('password_confirmation')}
        onChange={props.onTextInputChange.bind(this, 'password_confirmation')}
        type='password'
        value={props.item.password_confirmation || ''}
      />
    </Modal.Content>
    { props.children }
  </Modal>
);

export default withTranslation()(UserModal);
