// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import AttributesGrid from '../components/AttributesGrid';
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
        { item && item.primary_attachment && (
          <RecordPage.Section>
            <RecordPage.Image
              item={item.primary_attachment}
            />
          </RecordPage.Section>
        )}
      </RecordPage.Section>
      <RecordPage.Section>
        <AttributesGrid
          attributes={[{
            name: 'id',
            label: t('Common.labels.id'),
            renderValue: () => t('PhysicalComponent.labels.id', { id: item.id })
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
        />
      </RecordPage.Section>
    </RecordPage>
  );
};

export default PhysicalComponent;
