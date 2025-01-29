// @flow

import React, { useCallback } from 'react';
import { GoogleMap, GooglePlacesSearch } from '@performant-software/semantic-components';
import { GoogleScript } from '@performant-software/shared-components';
import { Form, Grid } from 'semantic-ui-react';
import _ from 'underscore';
import Countries from '../resources/Countries.json';
import ValueListDropdown from './ValueListDropdown';

import type { EditContainerProps } from 'react-components/types';
import type { Translateable } from '../types/Translateable';
import type { Place as PlaceType } from '../types/Place';

type Props = EditContainerProps & Translateable & {
  item: PlaceType
};

const PlaceForm = (props: Props) => {
  /**
   * Sets the location attributes on the current item.
   *
   * @type {function({result: *, lat: *, lng?: *}): void}
   */
  const onLocationSelection = useCallback(({ result, lat, lng }) => {
    const attributes = {
      name: result.name,
      city: '',
      state: '',
      country: '',
      lat,
      long: lng
    };

    _.each(result.address_components, (component) => {
      if (_.contains(component.types, 'locality')) {
        attributes.city = component.long_name;
      } else if (_.contains(component.types, 'administrative_area_level_1')) {
        attributes.state = component.long_name;
      } else if (_.contains(component.types, 'country')) {
        attributes.country = component.long_name;
      }
    });

    props.onSetState(attributes);
  }, []);

  return (
    <GoogleScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <Grid
        columns={2}
      >
        <Grid.Column>
          <Form.Field>
            <GooglePlacesSearch
              containerElement={<Form.Field />}
              onLocationSelection={onLocationSelection}
            >
              <Form.Input
                autoFocus
                error={props.isError('name')}
                label={props.t('Place.labels.name')}
                placeholder=''
                required={props.isRequired('name')}
                onChange={props.onTextInputChange.bind(this, 'name')}
                value={props.item.name || ''}
              />
            </GooglePlacesSearch>
          </Form.Field>
          <Form.Input
            error={props.isError('place_type')}
            label={props.t('Place.labels.type')}
            required={props.isRequired('place_type')}
            onChange={props.onTextInputChange.bind(this, 'place_type')}
            value={props.item.place_type || ''}
          />
          <Form.Input
            error={props.isError('city')}
            label={props.t('Place.labels.city')}
            required={props.isRequired('city')}
            onChange={props.onTextInputChange.bind(this, 'city')}
            value={props.item.city || ''}
          />
          <Form.Input
            error={props.isError('state')}
            label={props.t('Place.labels.state')}
            required={props.isRequired('state')}
            onChange={props.onTextInputChange.bind(this, 'state')}
            value={props.item.state || ''}
          />
          <Form.Dropdown
            error={props.isError('country')}
            label={props.t('Place.labels.country')}
            required={props.isRequired('country')}
            onChange={props.onTextInputChange.bind(this, 'country')}
            options={_.map(Countries, (country) => ({
              key: country.Code,
              value: country.Name,
              text: country.Name
            }))}
            selection
            value={props.item.country || ''}
          />
          <Form.Input
            error={props.isError('url')}
            label={props.t('Place.labels.url')}
            required={props.isRequired('url')}
            onChange={props.onTextInputChange.bind(this, 'url')}
            value={props.item.url || ''}
          />
          <ValueListDropdown
            {...props}
            group='Authorized Vocabulary'
            label={props.t('Place.labels.authorizedVocabulary')}
            object='General'
          />
          <Form.Input
            error={props.isError('authorized_vocabulary_url')}
            label={props.t('Place.labels.authorizedVocabularyUrl')}
            required={props.isRequired('authorized_vocabulary_url')}
            onChange={props.onTextInputChange.bind(this, 'authorized_vocabulary_url')}
            value={props.item.authorized_vocabulary_url || ''}
          />
          <Form.Input
            error={props.isError('database_value')}
            label={props.t('Place.labels.databaseValue')}
            required={props.isRequired('database_value')}
            onChange={props.onTextInputChange.bind(this, 'database_value')}
            value={props.item.database_value || ''}
          />
          <Form.TextArea
            error={props.isError('notes')}
            label={props.t('Place.labels.notes')}
            required={props.isRequired('notes')}
            onChange={props.onTextInputChange.bind(this, 'notes')}
            value={props.item.notes || ''}
          />
        </Grid.Column>
        <Grid.Column>
          <GoogleMap
            position={{ lat: props.item.lat, lng: props.item.long }}
          />
        </Grid.Column>
      </Grid>
    </GoogleScript>
  );
};

export default PlaceForm;
