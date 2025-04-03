// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Modal } from 'semantic-ui-react';
import ValueListDropdown from './ValueListDropdown';

import type { EditContainerProps } from 'react-components/types';
import type { Translateable } from '../types/Translateable';
import type { ValueList } from '../types/ValueList';

type Props = EditContainerProps & Translateable & {
  item: ValueList
};

const ValueListModal = (props: Props) => (
  <Modal
    as={Form}
    className='value-list-modal'
    centered={false}
    noValidate
    open
  >
    <Modal.Header
      content={props.item.id
        ? props.t('ValueList.title.edit')
        : props.t('ValueList.title.add')}
    />
    <Modal.Content>
      <Form.Input
        disabled={props.item.qualifications_count > 0}
        error={props.isError('object')}
        label={props.t('ValueList.labels.objectName')}
        onChange={props.onTextInputChange.bind(this, 'object')}
        required={props.isRequired('object')}
        value={props.item.object || ''}
      />
      <Form.Input
        disabled={props.item.qualifications_count > 0}
        error={props.isError('group')}
        label={props.t('ValueList.labels.groupName')}
        onChange={props.onTextInputChange.bind(this, 'group')}
        required={props.isRequired('group')}
        value={props.item.group || ''}
      />
      <Form.Input
        error={props.isError('human_name')}
        label={props.t('ValueList.labels.humanName')}
        onChange={props.onTextInputChange.bind(this, 'human_name')}
        required={props.isRequired('human_name')}
        value={props.item.human_name || ''}
      />
      { props.item.group !== 'Authorized Vocabulary' && (
        <ValueListDropdown
          {...props}
          group='Authorized Vocabulary'
          label={props.t('ValueList.labels.authorizedVocabulary')}
          object='General'
        />
      )}
      <Form.Input
        error={props.isError('authorized_vocabulary_url')}
        label={props.t('ValueList.labels.authorizedVocabularyUrl')}
        onChange={props.onTextInputChange.bind(this, 'authorized_vocabulary_url')}
        required={props.isRequired('authorized_vocabulary_url')}
        value={props.item.authorized_vocabulary_url || ''}
      />
      <Form.Input
        error={props.isError('database_value')}
        label={props.t('ValueList.labels.databaseValue')}
        onChange={props.onTextInputChange.bind(this, 'database_value')}
        required={props.isRequired('database_value')}
        value={props.item.database_value || ''}
      />
      <Form.TextArea
        error={props.isError('comment')}
        label={props.t('ValueList.labels.comment')}
        onChange={props.onTextInputChange.bind(this, 'comment')}
        required={props.isRequired('comment')}
        value={props.item.comment || ''}
      />
    </Modal.Content>
    { props.children }
  </Modal>
);

export default withTranslation()(ValueListModal);
