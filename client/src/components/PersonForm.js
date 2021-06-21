// @flow

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form } from 'semantic-ui-react';
import _ from 'underscore';
import Nationalities from '../resources/Nationalities.json';

import type { EditContainerProps } from 'react-components/types';
import type { Person } from '../types/Person';
import type { Translateable } from '../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: Person
};

const PersonForm = (props: Props) => (
  <>
    <Form.Input
      error={props.isError('name')}
      label={props.t('Person.labels.name')}
      onChange={props.onTextInputChange.bind(this, 'name')}
      required={props.isRequired('name')}
      value={props.item.name || ''}
    />
    <Form.Input
      error={props.isError('display_name')}
      label={props.t('Person.labels.displayName')}
      onChange={props.onTextInputChange.bind(this, 'display_name')}
      required={props.isRequired('display_name')}
      value={props.item.display_name || ''}
    />
    <Form.Input
      error={props.isError('person_type')}
      label={props.t('Person.labels.type')}
      onChange={props.onTextInputChange.bind(this, 'person_type')}
      required={props.isRequired('person_type')}
      value={props.item.person_type || ''}
    />
    <Form.Dropdown
      error={props.isError('nationality')}
      label={props.t('Person.labels.nationality')}
      onChange={props.onTextInputChange.bind(this, 'nationality')}
      options={_.sortBy(Nationalities, (nationality) => nationality.value)}
      required={props.isRequired('nationality')}
      selection
      value={props.item.nationality || ''}
    />
    <Form.Input
      error={props.isError('authorized_vocabulary')}
      label={props.t('Person.labels.authorizedVocabulary')}
      onChange={props.onTextInputChange.bind(this, 'authorized_vocabulary')}
      required={props.isRequired('authorized_vocabulary')}
      value={props.item.authorized_vocabulary || ''}
    />
    <Form.Input
      error={props.isError('url')}
      label={props.t('Person.labels.url')}
      onChange={props.onTextInputChange.bind(this, 'url')}
      required={props.isRequired('url')}
      value={props.item.url || ''}
    />
    <Form.Input
      error={props.isError('database_value')}
      label={props.t('Person.labels.databaseValue')}
      onChange={props.onTextInputChange.bind(this, 'database_value')}
      required={props.isRequired('database_value')}
      value={props.item.database_value || ''}
    />
    <Form.TextArea
      error={props.isError('comment')}
      label={props.t('Person.labels.comment')}
      onChange={props.onTextInputChange.bind(this, 'comment')}
      required={props.isRequired('comment')}
      value={props.item.comment || ''}
    />
  </>
);

export default withTranslation()(PersonForm);
