// @flow

import React from 'react';
import { AssociatedDropdown } from 'react-components';
import { withTranslation } from 'react-i18next';
import { Form, Modal } from 'semantic-ui-react';
import Artworks from '../services/Artworks';
import Artwork from '../transforms/Artwork';
import People from '../services/People';
import Person from '../transforms/Person';
import PersonModal from './PersonModal';

import type { EditContainerProps } from 'react-components/types';
import type { Participation } from '../types/Participation';
import type { Translateable } from '../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: Participation,
  type: number
};

const ParticipationTypes = {
  artwork: 0,
  person: 1
};

const ParticipationModal = (props: Props) => (
  <Modal
    as={Form}
    centered={false}
    open
    noValidate
  >
    <Modal.Header
      content={props.item.id
        ? props.t('ParticipationModal.title.edit')
        : props.t('ParticipationModal.title.add')}
    />
    <Modal.Content>
      { props.type === ParticipationTypes.person && (
        <Form.Input
          error={props.isError('person_id')}
          label={props.t('ParticipationModal.labels.person')}
          required={props.isRequired('person_id')}
        >
          <AssociatedDropdown
            collectionName='people'
            modal={{
              component: PersonModal,
              onSave: (person) => People.save(person).then(({ data }) => data.person)
            }}
            onSearch={(search) => People.fetchAll({ search, sort_by: 'display_name' })}
            onSelection={props.onAssociationInputChange.bind(this, 'person_id', 'person')}
            renderOption={Person.toDropdown.bind(this)}
            searchQuery={props.item.person && props.item.person.display_name}
            value={props.item.person_id || ''}
          />
        </Form.Input>
      )}
      { props.type === ParticipationTypes.artwork && (
        <Form.Input
          error={props.isError('participateable_id')}
          label={props.t('ParticipationModal.labels.artwork')}
          required={props.isRequired('participateable_id')}
        >
          <AssociatedDropdown
            collectionName='artworks'
            onSearch={(search) => Artworks.fetchAll({ search, sort_by: 'artwork_titles.title' })}
            onSelection={props.onAssociationInputChange.bind(this, 'participateable_id', 'participateable')}
            renderOption={Artwork.toDropdown.bind(this)}
            searchQuery={(
              props.item.participateable
              && props.item.participateable.primary_title
              && props.item.participateable.primary_title.title
            )}
            value={props.item.participateable_id || ''}
          />
        </Form.Input>
      )}
      <Form.Input
        error={props.isError('role')}
        label={props.t('ParticipationModal.labels.role')}
        onChange={props.onTextInputChange.bind(this, 'role')}
        required={props.isRequired('role')}
        value={props.item.role || ''}
      />
      <Form.Input
        error={props.isError('subrole')}
        label={props.t('ParticipationModal.labels.subrole')}
        onChange={props.onTextInputChange.bind(this, 'subrole')}
        required={props.isRequired('subrole')}
        value={props.item.subrole || ''}
      />
      <Form.TextArea
        error={props.isError('description')}
        label={props.t('ParticipationModal.labels.description')}
        onChange={props.onTextInputChange.bind(this, 'description')}
        required={props.isRequired('description')}
        value={props.item.description || ''}
      />
      <Form.Input
        error={props.isError('certainty')}
        label={props.t('ParticipationModal.labels.certainty')}
        onChange={props.onTextInputChange.bind(this, 'certainty')}
        required={props.isRequired('certainty')}
        value={props.item.certainty || ''}
      />
      <Form.TextArea
        error={props.isError('notes')}
        label={props.t('ParticipationModal.labels.notes')}
        onChange={props.onTextInputChange.bind(this, 'notes')}
        required={props.isRequired('notes')}
        value={props.item.notes || ''}
      />
    </Modal.Content>
    { props.children }
  </Modal>
);

export default withTranslation()(ParticipationModal);

export {
  ParticipationTypes
};
