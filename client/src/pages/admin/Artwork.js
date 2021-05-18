// @flow

import React, { useCallback } from 'react';
import { BooleanIcon, EmbeddedList } from 'react-components';
import { Form, Header } from 'semantic-ui-react';
import _ from 'underscore';
import ArtworkTitleModal from '../../components/ArtworkTitleModal';
import ArtworksService from '../../services/Artworks';
import File from '../../transforms/File';
import i18n from '../../i18n/i18n';
import Images from '../../components/Images';
import RecordHeader from '../../components/RecordHeader';
import SimpleEditPage from '../../components/SimpleEditPage';
import useEditPage from './EditPage';

import type { EditContainerProps } from 'react-components/types';
import type { Artwork as ArtworkType } from '../../types/Artwork';
import type { Translateable } from '../../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: ArtworkType
};

const Tabs = {
  details: 'details',
  images: 'images'
};

const Artwork = (props: Props) => {
  const getImage = useCallback(() => {
    const image = _.find(props.item.attachments, (a) => a.primary && !a._destroy);
    return image && image.thumbnail_url;
  }, [props.item.attachments]);

  const getTitle = useCallback(() => {
    const title = _.find(props.item.artwork_titles, (t) => t.primary && !t._destroy);
    return title && title.title;
  }, [props.item.artwork_titles]);

  return (
    <SimpleEditPage
      errors={props.errors}
      loading={props.loading}
      onSave={props.onSave}
    >
      <SimpleEditPage.Header>
        <RecordHeader
          header={getTitle()}
          image={getImage()}
          meta={props.item.date_descriptor}
          notes={props.item.notes_internal}
          published={props.item.published}
          onNotesChange={props.onTextInputChange.bind(this, 'notes_internal')}
          onPublish={props.onCheckboxInputChange.bind(this, 'published')}
        />
      </SimpleEditPage.Header>
      <SimpleEditPage.Tab
        key={Tabs.details}
        name={props.t('Artwork.tabs.details')}
      >
        <Header
          content={props.t('Artwork.labels.titles')}
        />
        <EmbeddedList
          actions={[{
            name: 'edit'
          }, {
            name: 'copy'
          }, {
            name: 'delete'
          }]}
          columns={[{
            name: 'title',
            label: props.t('Artwork.titles.columns.title')
          }, {
            name: 'title_type',
            label: props.t('Artwork.titles.columns.titleType')
          }, {
            name: 'primary',
            label: props.t('Artwork.titles.columns.primary'),
            render: (at) => <BooleanIcon value={at.primary} />
          }]}
          items={props.item.artwork_titles}
          modal={{
            component: ArtworkTitleModal,
            props: {
              defaults: {
                primary: false
              },
              required: ['title', 'title_type']
            }
          }}
          onDelete={props.onDeleteChildAssociation.bind(this, 'artwork_titles')}
          onDrag={(dragIndex, hoverIndex) => {
            const items = [...props.item.artwork_titles];
            const item = items[dragIndex];

            items.splice(dragIndex, 1);
            items.splice(hoverIndex, 0, item);

            props.onSetState({ artwork_titles: items });
          }}
          onSave={props.onSaveChildAssociation.bind(this, 'artwork_titles')}
        />
        <Header
          content={props.t('Artwork.labels.creationDate')}
        />
        <Form.Group
          widths='equal'
        >
          <Form.Input
            error={props.isError('date_start')}
            label={props.t('Artwork.labels.startDate')}
            onChange={props.onTextInputChange.bind(this, 'date_start')}
            required={props.isRequired('date_start')}
            value={props.item.date_start || ''}
          />
          <Form.Input
            error={props.isError('date_end')}
            label={props.t('Artwork.labels.endDate')}
            onChange={props.onTextInputChange.bind(this, 'date_end')}
            required={props.isRequired('date_end')}
            value={props.item.date_end || ''}
          />
        </Form.Group>
        <Form.Input
          error={props.isError('date_descriptor')}
          label={props.t('Artwork.labels.dateDescription')}
          onChange={props.onTextInputChange.bind(this, 'date_descriptor')}
          required={props.isRequired('date_descriptor')}
          value={props.item.date_descriptor || ''}
        />
        <Header
          content={props.t('Artwork.labels.notes')}
        />
        <Form.TextArea
          onChange={props.onTextInputChange.bind(this, 'notes_external')}
          required={props.isRequired('notes_external')}
          value={props.item.notes_external || ''}
        />
      </SimpleEditPage.Tab>
      <SimpleEditPage.Tab
        key={Tabs.images}
        name={props.t('Artwork.tabs.images')}
      >
        <Images
          actions={[{
            color: (item) => (item.primary ? 'green' : undefined),
            icon: 'checkmark',
            name: 'primary',
            onClick: (item) => props.onSetState({
              attachments: _.map(props.item.attachments,
                (attachment) => ({ ...attachment, primary: attachment === item }))
            })
          }, {
            color: () => 'red',
            icon: 'times',
            name: 'delete',
            onClick: (item) => props.onDeleteChildAssociation('attachments', item)
          }]}
          items={_.filter(props.item.attachments, (attachment) => !attachment._destroy)}
          onFilesAdded={(files) => {
            const isPrimary = (index) => _.isEmpty(_.filter(props.item.attachments, (a) => !a._destroy)) && index === 0;
            _.each(files, (file, index) => {
              const attachment = File.toAttachment(file, isPrimary(index));
              props.onSaveChildAssociation('attachments', attachment);
            });
          }}
          renderImage={(item) => item.thumbnail_url}
        />
      </SimpleEditPage.Tab>
    </SimpleEditPage>
  );
}

export default useEditPage(Artwork, {
  onLoad: (id) => ArtworksService.fetchOne(id).then(({ data }) => data.artwork),
  onSave: (artwork) => ArtworksService.save(artwork),
  required: ['date_descriptor'],
  validate: (artwork) => {
    let validationErrors = {};

    if (!_.isEmpty(artwork.date_start) && Number.isNaN(parseInt(artwork.date_start, 10))) {
      validationErrors = _.extend(validationErrors, {
        date_start: i18n.t('Artwork.errors.dateNumeric', { name: i18n.t('Artwork.labels.startDate') })
      });
    }

    if (!_.isEmpty(artwork.date_end) && Number.isNaN(parseInt(artwork.date_end, 10))) {
      validationErrors = _.extend(validationErrors, {
        date_end: i18n.t('Artwork.errors.dateNumeric', { name: i18n.t('Artwork.labels.endDate') })
      });
    }

    return validationErrors;
  }
});
