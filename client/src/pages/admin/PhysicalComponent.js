// @flow

import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import ItemLabel from '../../components/ItemLabel';
import PhysicalComponentsService from '../../services/PhysicalComponents';
import RecordHeader from '../../components/RecordHeader';
import SimpleEditPage from '../../components/SimpleEditPage';
import useEditPage from './EditPage';
import Validations from '../../utils/Validations';
import withMenuBar from '../../hooks/MenuBar';
import withSingleImage from '../../hooks/Image';

import type { EditPageProps } from './EditPage';
import type { ImageProps } from '../../hooks/Image';
import type { PhysicalComponent as PhysicalComponentType } from '../../types/PhysicalComponent';
import type { Translateable } from '../../types/Translateable';
import type { Routeable } from '../../types/Routeable';

type Props = EditPageProps & ImageProps & Routeable & Translateable & {
  item: PhysicalComponentType
};

const Tabs = {
  details: 'details'
};

const PhysicalComponent = (props: Props) => {
  /**
   * Sets the artwork_id from the state.
   */
  useEffect(() => {
    if (props.location.state && props.location.state.artwork_id) {
      props.onSetState({ artwork_id: props.location.state.artwork_id });
    }
  }, []);

  return (
    <SimpleEditPage
      artworkId={props.item.artwork_id}
      errors={props.errors}
      loading={props.loading}
      onSave={props.onSave}
      onTabClick={props.onTabClick}
      saving={props.saving}
      type={props.item.id ? undefined : props.t('Common.labels.physicalComponent')}
    >
      <SimpleEditPage.Header>
        <RecordHeader
          description={(
            <ItemLabel
              content={props.t('Common.labels.physicalComponent')}
              level={1}
            />
          )}
          header={props.item.name}
          image={props.image && props.image.file_url}
          includeNotesButton={false}
          includePublishButton={false}
          onFileDelete={props.onDeleteImage}
          onFileEdit={props.onEditImage}
          onFileUpload={props.onSaveImage}
        />
      </SimpleEditPage.Header>
      <SimpleEditPage.Tab
        key={Tabs.details}
        name={props.t('Common.tabs.details')}
      >
        <Form.Input
          error={props.isError('name')}
          label={props.t('PhysicalComponent.labels.name')}
          onChange={props.onTextInputChange.bind(this, 'name')}
          required={props.isRequired('name')}
          value={props.item.name || ''}
        />
        <Form.Input
          error={props.isError('height')}
          label={props.t('PhysicalComponent.labels.height')}
          onChange={props.onTextInputChange.bind(this, 'height')}
          required={props.isRequired('height')}
          value={props.item.height || ''}
        />
        <Form.Input
          error={props.isError('width')}
          label={props.t('PhysicalComponent.labels.width')}
          onChange={props.onTextInputChange.bind(this, 'width')}
          required={props.isRequired('width')}
          value={props.item.width || ''}
        />
        <Form.Input
          error={props.isError('depth')}
          label={props.t('PhysicalComponent.labels.depth')}
          onChange={props.onTextInputChange.bind(this, 'depth')}
          required={props.isRequired('depth')}
          value={props.item.depth || ''}
        />
        <Form.TextArea
          error={props.isError('notes')}
          label={props.t('PhysicalComponent.labels.notes')}
          onChange={props.onTextInputChange.bind(this, 'notes')}
          required={props.isRequired('notes')}
          value={props.item.notes || ''}
        />
      </SimpleEditPage.Tab>
    </SimpleEditPage>
  );
};

export default useEditPage(withRouter(withMenuBar(withSingleImage(PhysicalComponent))), {
  getArtworkId: (item) => item.artwork_id,
  onLoad: (id) => PhysicalComponentsService.fetchOne(id).then(({ data }) => data.physical_component),
  onSave: (pc) => PhysicalComponentsService.save(pc).then(({ data }) => data.physical_component),
  validate: Validations.validateDimensions.bind(this)
});
