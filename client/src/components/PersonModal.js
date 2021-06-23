// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Modal } from 'semantic-ui-react';
import PersonForm from './PersonForm';

import type { EditContainerProps } from 'react-components/types';
import type { Person } from '../types/Person';
import type { Translateable } from '../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: Person
};

const PersonModal = (props: Props) => (
  <Modal
    as={Form}
    centered={false}
    noValidate
    open
  >
    <Modal.Header
      content={props.item.id
        ? props.t('PersonModal.title.edit')
        : props.t('PersonModal.title.add')}
    />
    <Modal.Content>
      <PersonForm
        {...props}
      />
    </Modal.Content>
    { props.children }
  </Modal>
);

export default withTranslation()(PersonModal);
