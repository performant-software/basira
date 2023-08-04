// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Segment } from 'semantic-ui-react';
import _ from 'underscore';
import ArtworkCreators from '../components/ArtworkCreators';
import ArtworkTitles from '../components/ArtworkTitles';
import ArtworksService from '../services/Artworks';
import AttributesGrid from '../components/AttributesGrid';
import { getPrimaryTitle } from '../utils/Artwork';
import Places from '../components/Places';
import RecordPage from '../components/RecordPage';
import useCurrentRecord from '../hooks/CurrentRecord';

const Artwork = () => {
  /**
   * Callback for loading the current artwork.
   *
   * @type {function(*): Promise<AxiosResponse<T>>|Promise<AxiosResponse<T>|unknown>|Promise<unknown>|*}
   */
  const onLoad = useCallback((id) => (
    ArtworksService
      .fetchOne(id)
      .then(({ data }) => data.artwork)
  ), []);

  const { item, loading } = useCurrentRecord(onLoad);
  const { t } = useTranslation();

  return (
    <RecordPage
      artworkId={item?.id}
      loading={loading}
      renderTitle={() => getPrimaryTitle(item)}
    >
      { item && item.primary_attachment && (
        <RecordPage.Section>
          <RecordPage.Image
            item={item.primary_attachment}
          />
        </RecordPage.Section>
      )}
      { !_.isEmpty(item?.artwork_titles) && (
        <RecordPage.Section
          title={t('Artwork.sections.titles')}
        >
          <Segment>
            <ArtworkTitles
              items={item.artwork_titles}
            />
          </Segment>
        </RecordPage.Section>
      )}
      <RecordPage.Section>
        <AttributesGrid
          attributes={[{
            name: 'date_start',
            label: t('Artwork.labels.startDate')
          }, {
            name: 'date_end',
            label: t('Artwork.labels.endDate')
          }, {
            name: 'date_descriptor',
            label: t('Artwork.labels.dateDescription')
          }, {
            name: 'object_work_type',
            label: t('Artwork.labels.objectWorkType'),
            qualification: {
              object: 'Artwork',
              group: 'Object/Work Type'
            }
          }, {
            name: 'materials',
            label: t('Artwork.labels.materials'),
            qualification: {
              object: 'Artwork',
              group: 'Material'
            }
          }, {
            name: 'techniques',
            label: t('Artwork.labels.techniques'),
            qualification: {
              object: 'Artwork',
              group: 'Technique'
            }
          }, {
            name: 'height',
            label: t('Artwork.labels.height')
          }, {
            name: 'width',
            label: t('Artwork.labels.width')
          }, {
            name: 'depth',
            label: t('Artwork.labels.depth')
          }, {
            name: 'commissioning_context',
            label: t('Artwork.labels.commissioningContext'),
            qualification: {
              object: 'Artwork',
              group: 'Commissioning Context'
            }
          }, {
            name: 'number_documents_visible',
            label: t('Artwork.labels.numberDocumentsVisible')
          }, {
            name: 'notes_external',
            label: t('Artwork.labels.notes')
          }]}
          item={item}
        />
      </RecordPage.Section>
      { !_.isEmpty(item?.participations) && (
        <RecordPage.Section
          title={t('Artwork.sections.creators')}
        >
          <ArtworkCreators
            items={item.participations}
          />
        </RecordPage.Section>
      )}
      { !_.isEmpty(item?.locations) && (
        <RecordPage.Section
          title={t('Artwork.sections.locations')}
        >
          <Places
            places={_.map(item.locations, (location) => location.place)}
          />
        </RecordPage.Section>
      )}
    </RecordPage>
  );
};

export default Artwork;
