// @flow

import React from 'react';
import { ListTable } from '@performant-software/semantic-components';
import { Container } from 'semantic-ui-react';
import UserModal from '../../components/UserModal';
import UsersService from '../../services/Users';
import withMenuBar from '../../hooks/MenuBar';

import type { Translateable } from '../../types/Translateable';

const ERROR_EMAIL = 'is not an email';
const ERROR_PASSWORD_LENGTH = 'is too short';
const ERROR_PASSWORD_MATCH = 'doesn\'t match';

const Users = (props: Translateable) => (
  <Container>
    <ListTable
      actions={[{
        name: 'edit'
      }, {
        name: 'copy'
      }, {
        name: 'delete'
      }]}
      addButton={{
        basic: false,
        color: 'green',
        location: 'top'
      }}
      className='users'
      collectionName='users'
      columns={[{
        name: 'name',
        label: props.t('Users.columns.name'),
        sortable: true
      }, {
        name: 'email',
        label: props.t('Users.columns.email'),
        sortable: true
      }]}
      modal={{
        component: UserModal,
        onInitialize: (id) => (
          UsersService
            .fetchOne(id)
            .then(({ data: { user } }) => user)
        ),
        props: {
          required: ['name', 'email'],
          resolveValidationError: (error) => {
            const errors = {};

            // Email must follow name@domain.<suffix> format
            if (error.includes(ERROR_EMAIL)) {
              errors.email = props.t('Users.errors.email', { error });
            }

            // Passwords must be a certain length
            if (error.includes(ERROR_PASSWORD_LENGTH)) {
              errors.password = props.t('Users.errors.password', { error });
            }

            // Confirmation must match password
            if (error.includes(ERROR_PASSWORD_MATCH)) {
              errors.password_confirmation = props.t('Users.errors.passwordConfirmation', { error });
            }

            return errors;
          }
        }
      }}
      onDelete={(user) => UsersService.delete(user)}
      onLoad={(params) => UsersService.fetchAll(params)}
      onSave={(user) => UsersService.save(user)}
    />
  </Container>
);

export default withMenuBar(Users);
