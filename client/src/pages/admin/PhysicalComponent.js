// @flow

import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import withMenuBar from '../../hooks/MenuBar';
import SimpleEditPage from '../../components/SimpleEditPage';
import RecordHeader from '../../components/RecordHeader';
import useEditPage from './EditPage';
import PhysicalComponentsService from '../../services/PhysicalComponents';

import type { EditContainerProps } from 'react-components/types';
import type { PhysicalComponent as PhysicalComponentType } from '../../types/PhysicalComponent';
import type { Translateable } from '../../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: PhysicalComponentType
};

const Tabs = {
  details: 'details'
};

const PhysicalComponent = (props: Props) => {
  useEffect(() => {
    if (props.location.state && props.location.state.artwork_id) {
      props.onSetState({ artwork_id: props.location.state.artworkId });
    }
  }, []);

  return (
    <SimpleEditPage
      artworkId={props.item.artwork_id}
      errors={props.errors}
      loading={props.loading}
      onSave={props.onSave}
    >
      <SimpleEditPage.Header>
        <RecordHeader
          header={props.item.name}
          image={props.item.primary_attachment && props.item.primary_attachment.thumbnail_url}
          includeNotesButton={false}
          includePublishButton={false}
        />
      </SimpleEditPage.Header>
      <SimpleEditPage.Tab
        key={Tabs.details}
        name={props.t('Common.tabs.details')}
      >
        <div>{props.artwork_id}</div>
        <div>{props.location.state && props.location.state.artwork_id}</div>
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
      </SimpleEditPage.Tab>
    </SimpleEditPage>
  );
};

export default useEditPage(withRouter(withMenuBar(PhysicalComponent)), {
  getArtworkId: (item) => item.artwork_id,
  onLoad: (id) => PhysicalComponentsService.fetchOne(id).then(({ data }) => data.physical_component),
  onSave: (pc) => PhysicalComponentsService.save(pc)
});
