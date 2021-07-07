// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Modal } from 'semantic-ui-react';
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
      <div
        className='action-description'
      >
        <div>The book</div>
        <ValueListDropdown
          {...props}
          object='Document'
          group='Action'
          width={7}
        />
        <ValueListDropdown
          {...props}
          object='Action'
          group='Entity'
          width={7}
        />
      </div>
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
