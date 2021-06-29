// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Modal } from 'semantic-ui-react';

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
        error={props.isError('table')}
        label={props.t('ValueList.labels.objectName')}
        onChange={props.onTextInputChange.bind(this, 'table')}
        required={props.isRequired('table')}
        value={props.item.table || ''}
      />
      <Form.Input
        error={props.isError('column_readable')}
        label={props.t('ValueList.labels.groupName')}
        onChange={props.onTextInputChange.bind(this, 'column')}
        required={props.isRequired('column_readable')}
        value={props.item.column_readable || ''}
      />
      <Form.Input
        error={props.isError('value')}
        label={props.t('ValueList.labels.humanName')}
        onChange={props.onTextInputChange.bind(this, 'value')}
        required={props.isRequired('value')}
        value={props.item.value || ''}
      />
      <Form.Input
        error={props.isError('authorized_vocabulary')}
        label={props.t('ValueList.labels.authorizedVocabulary')}
        onChange={props.onTextInputChange.bind(this, 'authorized_vocabulary')}
        required={props.isRequired('authorized_vocabulary')}
        value={props.item.authorized_vocabulary || ''}
      />
      <Form.Input
        error={props.isError('url_database_value')}
        label={props.t('ValueList.labels.urlDatabaseValue')}
        onChange={props.onTextInputChange.bind(this, 'url_database_value')}
        required={props.isRequired('url_database_value')}
        value={props.item.url_database_value || ''}
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
