// @flow

import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Dropdown, Form, Modal } from 'semantic-ui-react';
import ValueLists from '../services/ValueLists';

import type { EditContainerProps } from 'react-components/types';
import type { Translateable } from '../types/Translateable';
import type { ValueList } from '../types/ValueList';

type Props = EditContainerProps & Translateable & {
  item: ValueList
};

const ValueListModal = (props: Props) => {
  const [authorizedVocabulariesList, setAuthorizedVocabulariesList] = useState([]);

  useEffect(() => {
    ValueLists.getAuthorizedVocabulariesList().then(({ data }) => {
      setAuthorizedVocabulariesList(data.authorized_vocabularies.map((vocab) => ({
        key: vocab,
        value: vocab,
        text: vocab
      })));
    });
  }, []);

  return (
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
          disabled={props.item.id}
          error={props.isError('object')}
          label={props.t('ValueList.labels.objectName')}
          onChange={props.onTextInputChange.bind(this, 'object')}
          required={props.isRequired('object')}
          value={props.item.object || ''}
        />
        <Form.Input
          disabled={props.item.id}
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
        <Form.Input
          error={props.isError('authorized_vocabulary')}
          label={props.t('ValueList.labels.authorizedVocabulary')}
          required={props.isRequired('authorized_vocabulary')}
        >
          <Dropdown
            fluid
            onChange={props.onTextInputChange.bind(this, 'authorized_vocabulary')}
            options={authorizedVocabulariesList}
            searchable
            selection
            value={props.item.authorized_vocabulary || ''}
          />
        </Form.Input>
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
};

export default withTranslation()(ValueListModal);
