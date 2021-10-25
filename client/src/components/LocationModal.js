// @flow

import React from 'react';
import { AssociatedDropdown } from 'react-components';
import { withTranslation } from 'react-i18next';
import { Form, Modal } from 'semantic-ui-react';
import Artworks from '../services/Artworks';
import Artwork from '../transforms/Artwork';
import Certainty from '../resources/Certainty.json';
import People from '../services/People';
import Person from '../transforms/Person';
import PersonModal from './PersonModal';
import Place from '../transforms/Place';
import PlaceModal from './PlaceModal';
import Places from '../services/Places';
import ValueListDropdown from './ValueListDropdown';

import type { EditContainerProps } from 'react-components/types';
import type { Participation } from '../types/Participation';
import type { Translateable } from '../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: Participation,
  type: number
};

const LocationTypes = {
  artwork: 0,
  person: 1,
  place: 2
};

const LocationModal = (props: Props) => (
  <Modal
    as={Form}
    centered={false}
    open
    noValidate
  >
    <Modal.Header
      content={props.item.id
        ? props.t('LocationModal.title.edit')
        : props.t('LocationModal.title.add')}
    />
    <Modal.Content>
      { props.type === LocationTypes.place && (
        <Form.Input
          error={props.isError('place_id')}
          label={props.t('LocationModal.labels.place')}
          required={props.isRequired('place_id')}
        >
          <AssociatedDropdown
            collectionName='places'
            modal={{
              component: PlaceModal,
              onSave: (place) => Places.save(place).then(({ data }) => data.place)
            }}
            onSearch={(search) => Places.fetchAll({ search, sort_by: 'name' })}
            onSelection={props.onAssociationInputChange.bind(this, 'place_id', 'place')}
            renderOption={Place.toDropdown.bind(this)}
            searchQuery={props.item.place && props.item.place.name}
            value={props.item.place_id || ''}
          />
        </Form.Input>
      )}
      { props.type === LocationTypes.artwork && (
        <Form.Input
          error={props.isError('locateable_id')}
          label={props.t('LocationModal.labels.artwork')}
          required={props.isRequired('locateable_id')}
        >
          <AssociatedDropdown
            collectionName='artworks'
            onSearch={(search) => Artworks.fetchAll({ search, sort_by: 'artwork_titles.title' })}
            onSelection={props.onAssociationInputChange.bind(this, 'locateable_id', 'locateable')}
            renderOption={Artwork.toDropdown.bind(this)}
            searchQuery={(
              props.item.locateable
              && props.item.locateable.primary_title
              && props.item.locateable.primary_title.title
            )}
            value={props.item.locateable_id || ''}
          />
        </Form.Input>
      )}
      { props.type === LocationTypes.person && (
        <Form.Input
          error={props.isError('locateable_id')}
          label={props.t('LocationModal.labels.person')}
          required={props.isRequired('locateable_id')}
        >
          <AssociatedDropdown
            collectionName='people'
            modal={{
              component: PersonModal,
              onSave: (person) => People.save(person).then(({ data }) => data.person)
            }}
            onSearch={(search) => People.fetchAll({ search, sort_by: 'display_name' })}
            onSelection={props.onAssociationInputChange.bind(this, 'locateable_id', 'locateable')}
            renderOption={Person.toDropdown.bind(this)}
            searchQuery={props.item.locateable && props.item.locateable.display_name}
            value={props.item.locateable_id || ''}
          />
        </Form.Input>
      )}
      <ValueListDropdown
        {...props}
        group='Role'
        label={props.t('LocationModal.labels.role')}
        object='Location'
      />
      <Form.Input
        error={props.isError('subrole')}
        label={props.t('LocationModal.labels.subrole')}
        onChange={props.onTextInputChange.bind(this, 'subrole')}
        required={props.isRequired('subrole')}
        value={props.item.subrole || ''}
      />
      <Form.Input
        error={props.isError('repository_work_url')}
        label={props.t('LocationModal.labels.repositoryWorkUrl')}
        onChange={props.onTextInputChange.bind(this, 'repository_work_url')}
        required={props.isRequired('repository_work_url')}
        value={props.item.repository_work_url || ''}
      />
      <Form.TextArea
        error={props.isError('description')}
        label={props.t('LocationModal.labels.description')}
        onChange={props.onTextInputChange.bind(this, 'description')}
        required={props.isRequired('description')}
        value={props.item.description || ''}
      />
      <Form.Dropdown
        error={props.isError('certainty')}
        label={props.t('LocationModal.labels.certainty')}
        onChange={props.onTextInputChange.bind(this, 'certainty')}
        options={Certainty}
        required={props.isRequired('certainty')}
        selection
        value={props.item.certainty || ''}
      />
      <Form.TextArea
        error={props.isError('notes')}
        label={props.t('LocationModal.labels.notes')}
        onChange={props.onTextInputChange.bind(this, 'notes')}
        required={props.isRequired('notes')}
        value={props.item.notes || ''}
      />
    </Modal.Content>
    { props.children }
  </Modal>
);

export default withTranslation()(LocationModal);

export {
  LocationTypes
};
