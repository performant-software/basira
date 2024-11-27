// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import {
  Form,
  Header,
  Message,
  Modal
} from 'semantic-ui-react';
import EntityDescriptionDropdown from './EntityDescriptionDropdown';
import ValueListDropdown from './ValueListDropdown';
import './ActionModal.css';

import type { EditContainerProps } from 'react-components/types';
import type { Action } from '../types/Action';

type Props = EditContainerProps & {
  item: Action
};

const ActionModal = (props: Props) => (
  <Modal
    as={Form}
    centered={false}
    className='action-modal'
    noValidate
    open
  >
    <Modal.Header
      content={props.item.id
        ? props.t('ActionModal.title.edit')
        : props.t('ActionModal.title.add')}
    />
    <Modal.Content>
      <Message
        info
      >
        <Header
          className='action-description'
          size='medium'
        >
          <div>{ props.t('ActionModal.labels.document') }</div>
          <ValueListDropdown
            {...props}
            object='Document'
            group='Action'
            width={6}
          />
          <ValueListDropdown
            {...props}
            object='Action'
            group='Entity'
            width={6}
          />
        </Header>
      </Message>
      <EntityDescriptionDropdown
        {...props}
        label={props.t('ActionModal.labels.descriptors')}
        object='Action'
        group='Characteristic'
        multiple
      />
      <ValueListDropdown
        {...props}
        label={props.t('ActionModal.labels.body')}
        multiple
        object='Action'
        group='Body'
      />
      <Form.TextArea
        error={props.isError('notes')}
        label={props.t('ActionModal.labels.notes')}
        required={props.isRequired('notes')}
        onChange={props.onTextInputChange.bind(this, 'notes')}
        value={props.item.notes || ''}
      />
    </Modal.Content>
    { props.children }
  </Modal>
);

export default withTranslation()(ActionModal);
