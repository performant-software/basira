// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import AttributesGrid from '../components/AttributesGrid';
import { getDateTimeView } from '../utils/Date';
import PhysicalComponentsService from '../services/PhysicalComponents';
import RecordPage from '../components/RecordPage';
import useCurrentRecord from '../hooks/CurrentRecord';

const PhysicalComponent = () => {
  /**
   * Callback for loading the current physical component.
   *
   * @type {function(*): Promise<AxiosResponse<T>>|Promise<AxiosResponse<T>|unknown>|Promise<unknown>|*}
   */
  const onLoad = useCallback((id) => (
    PhysicalComponentsService
      .fetchOne(id)
      .then(({ data }) => data.physical_component)
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
              name: 'id',
              label: t('Common.labels.id'),
              renderValue: () => t('PhysicalComponent.labels.id', { id: item.id })
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
            }]}
            item={item}
            title={t('Common.labels.details')}
          />
        </RecordPage.Header>
      </RecordPage.Section>
    </RecordPage>
  );
};

export default PhysicalComponent;
