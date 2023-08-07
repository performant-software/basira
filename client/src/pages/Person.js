// @flow

import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'underscore';
import Artworks from '../components/Artworks';
import AttributesGrid from '../components/AttributesGrid';
import Locations from '../components/Locations';
import People from '../services/People';
import RecordPage from '../components/RecordPage';
import useCurrentRecord from '../hooks/CurrentRecord';

const Person = () => {
  /**
   * Callback to load the current person record.
   *
   * @type {function(*): Promise<AxiosResponse<T>>|Promise<AxiosResponse<T>|unknown>|Promise<unknown>|*}
   */
  const onLoad = useCallback((id) => (
    People.fetchOne(id).then(({ data }) => data.person)
  ), []);

  const { item, loading } = useCurrentRecord(onLoad);
  const { t } = useTranslation();

  /**
   * Sets the related artworks.
   */
  const artworks = useMemo(() => (
    _.map(_.where(item?.participations, { participateable_type: 'Artwork' }), (p) => p.participateable)
  ), [item]);

  return (
    <RecordPage
      loading={loading}
      renderTitle={() => item?.display_name}
    >
      <RecordPage.Section>
        <AttributesGrid
          attributes={[{
            name: 'name',
            label: t('Person.labels.name')
          }, {
            name: 'display_name',
            label: t('Person.labels.displayName')
          }, {
            name: 'nationality',
            label: t('Person.labels.nationality'),
            qualification: {
              object: 'Person',
              group: 'Nationality'
            }
          }, {
            name: 'artist_birth_date',
            label: t('Person.labels.yearOfBirth')
          }, {
            name: 'artist_death_date',
            label: t('Person.labels.yearOfDeath')
          }, {
            name: 'years_active',
            label: t('Person.labels.yearsOfActivity')
          }]}
          item={item}
        />
      </RecordPage.Section>
      { !_.isEmpty(item?.participations) && (
        <RecordPage.Section
          title={t('Person.tabs.artworks')}
        >
          <Artworks
            artworks={artworks}
          />
        </RecordPage.Section>
      )}
      { !_.isEmpty(item?.locations) && (
        <RecordPage.Section
          title={t('Common.tabs.locations')}
        >
          <Locations
            items={item.locations}
          />
        </RecordPage.Section>
      )}
    </RecordPage>
  );
};

export default Person;
