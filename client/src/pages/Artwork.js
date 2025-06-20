// @flow

import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'underscore';
import ArtworkCreators from '../components/ArtworkCreators';
import ArtworkTitles from '../components/ArtworkTitles';
import ArtworksService from '../services/Artworks';
import AttributesGrid from '../components/AttributesGrid';
import { getDateTimeView } from '../utils/Date';
import { getPrimaryTitle } from '../utils/Artwork';
import Locations from '../components/Locations';
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

  /**
   * Memo-izes the primary name of the artwork.
   */
  const name = useMemo(() => getPrimaryTitle(item), [item]);

  return (
    <RecordPage
      artworkId={item?.id}
      loading={loading}
      renderTitle={() => name}
    >
      <RecordPage.Section>
        <RecordPage.Header
          image={item?.primary_attachment}
        >
          <AttributesGrid
            attributes={[{
              name: 'name',
              label: t('Common.labels.name'),
              renderValue: () => name,
            }, {
              name: 'id',
              label: t('Common.labels.id'),
              renderValue: () => t('Artwork.labels.id', { id: item.id })
            }, {
              name: 'created_at',
              label: t('Common.labels.created'),
              renderValue: () => getDateTimeView(item.created_at)
            }, {
              name: 'updated_at',
              label: t('Common.labels.updated'),
              renderValue: () => getDateTimeView(item.updated_at)
            }, {
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
            title={t('Common.labels.details')}
          />
        </RecordPage.Header>
      </RecordPage.Section>
      { !_.isEmpty(item?.artwork_titles) && (
        <RecordPage.Section
          title={t('Artwork.sections.titles')}
        >
          <ArtworkTitles
            items={item.artwork_titles}
          />
        </RecordPage.Section>
      )}
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
          <Locations
            items={item.locations}
          />
        </RecordPage.Section>
      )}
    </RecordPage>
  );
};

export default Artwork;
