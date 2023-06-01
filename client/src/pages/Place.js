// @flow

import React, { useCallback, useMemo } from 'react';
import { GoogleMap } from 'react-components';
import { useTranslation } from 'react-i18next';
import _ from 'underscore';
import Artworks from '../components/Artworks';
import AttributesGrid from '../components/AttributesGrid';
import PlacesService from '../services/Places';
import RecordPage from '../components/RecordPage';
import useCurrentRecord from '../hooks/CurrentRecord';

const Place = () => {
  /**
   * Callback to load the current places record.
   *
   * @type {function(*): Promise<AxiosResponse<T>>|Promise<AxiosResponse<T>|unknown>|Promise<unknown>|*}
   */
  const onLoad = useCallback((id) => (
    PlacesService
      .fetchOne(id)
      .then(({ data }) => data.place)
  ), []);

  const { item, loading } = useCurrentRecord(onLoad);
  const { t } = useTranslation();

  /**
   * Sets the related artworks.
   */
  const artworks = useMemo(() => (
    _.map(_.where(item?.locations, { locateable_type: 'Artwork' }), (l) => l.locateable)
  ), [item]);

  return (
    <RecordPage
      loading={loading}
      renderTitle={() => item.name}
    >
      { item && item.lat && item.long && (
        <RecordPage.Section>
          <GoogleMap
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            position={{ lat: item.lat, lng: item.long }}
          />
        </RecordPage.Section>
      )}
      <RecordPage.Section>
        <AttributesGrid
          attributes={[{
            name: 'name',
            label: t('Place.labels.name')
          }, {
            name: 'place_type',
            label: t('Place.labels.type')
          }, {
            name: 'city',
            label: t('Place.labels.city')
          }, {
            name: 'state',
            label: t('Place.labels.state')
          }, {
            name: 'country',
            label: t('Place.labels.country')
          }, {
            name: 'url',
            label: t('Place.labels.url')
          }, {
            name: 'notes',
            label: t('Place.labels.notes')
          }]}
          item={item}
        />
      </RecordPage.Section>
      { !_.isEmpty(artworks) && (
        <RecordPage.Section
          title={t('Place.tabs.artworks')}
        >
          <Artworks
            artworks={artworks}
          />
        </RecordPage.Section>
      )}
    </RecordPage>
  );
};

export default Place;
