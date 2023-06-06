// @flow

import React, { useCallback } from 'react';
import { BooleanIcon, LazyImage } from 'react-components';
import { useTranslation } from 'react-i18next';
import AttributesGrid from '../components/AttributesGrid';
import VisualContextsService from '../services/VisualContexts';
import RecordPage from '../components/RecordPage';
import useCurrentRecord from '../hooks/CurrentRecord';

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
      loading={loading}
      renderTitle={() => item.name}
    >
      <RecordPage.Section>
        { item && item.primary_attachment && (
          <RecordPage.Section
            className='image-container'
          >
            <LazyImage
              src={item.primary_attachment.file_url}
            />
          </RecordPage.Section>
        )}
      </RecordPage.Section>
      <RecordPage.Section>
        <AttributesGrid
          attributes={[{
            name: 'height',
            label: t('PhysicalComponent.labels.height')
          }, {
            name: 'width',
            label: t('PhysicalComponent.labels.width')
          }, {
            name: 'depth',
            label: t('PhysicalComponent.labels.depth')
          }, {
            name: 'notes',
            label: t('PhysicalComponent.labels.notes')
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
        />
      </RecordPage.Section>
    </RecordPage>
  );
};

export default VisualContext;
