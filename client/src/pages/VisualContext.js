// @flow

import React, { useCallback } from 'react';
import { BooleanIcon } from '@performant-software/semantic-components';
import { useTranslation } from 'react-i18next';
import AttributesGrid from '../components/AttributesGrid';
import { getDateTimeView } from '../utils/Date';
import RecordPage from '../components/RecordPage';
import useCurrentRecord from '../hooks/CurrentRecord';
import VisualContextsService from '../services/VisualContexts';

const VisualContext = () => {
  /**
   * Callback for loading the current visual context.
   *
   * @type {function(*): Promise<AxiosResponse<T>>|Promise<AxiosResponse<T>|unknown>|Promise<unknown>|*}
   */
  const onLoad = useCallback((id) => (
    VisualContextsService
      .fetchOne(id)
      .then(({ data }) => data.visual_context)
  ), []);

  const { item, loading } = useCurrentRecord(onLoad);
  const { t } = useTranslation();

  return (
    <RecordPage
      artworkId={item?.artwork_id}
      loading={loading}
      renderTitle={() => item.name}
    >
      <RecordPage.Section>
        <RecordPage.Header
          image={item?.primary_attachment}
        >
          <AttributesGrid
            attributes={[{
              name: 'name',
              label: t('Common.labels.name')
            }, {
              name: 'id',
              label: t('Common.labels.id'),
              renderValue: () => t('VisualContext.labels.id', { id: item.id })
            }, {
              name: 'created_at',
              label: t('Common.labels.created'),
              renderValue: () => getDateTimeView(item.created_at)
            }, {
              name: 'updated_at',
              label: t('Common.labels.updated'),
              renderValue: () => getDateTimeView(item.updated_at)
            }, {
              name: 'height',
              label: t('VisualContext.labels.height')
            }, {
              name: 'width',
              label: t('VisualContext.labels.width')
            }, {
              name: 'depth',
              label: t('VisualContext.labels.depth')
            }, {
              name: 'notes',
              label: t('VisualContext.labels.notes')
            }, {
              name: 'general_subject_genre',
              label: t('VisualContext.labels.generalSubjectGenre'),
              qualification: {
                object: 'Visual Context',
                group: 'General Subject/Genre'
              }
            }, {
              name: 'subject_cultural_context',
              label: t('VisualContext.labels.subjectCulturalContext'),
              qualification: {
                object: 'Visual Context',
                group: 'Subject Cultural Context'
              }
            }, {
              name: 'subject_iconography',
              label: t('VisualContext.labels.specificSubjectIconography'),
              qualification: {
                object: 'Visual Context',
                group: 'Specific Subject/Iconography'
              }
            }, {
              name: 'beta',
              label: t('VisualContext.labels.beta'),
              renderValue: () => <BooleanIcon value={item.beta} />
            }]}
            item={item}
            title={t('Common.labels.details')}
          />
        </RecordPage.Header>
      </RecordPage.Section>
    </RecordPage>
  );
};

export default VisualContext;
