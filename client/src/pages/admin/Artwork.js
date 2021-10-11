// @flow

import React, { useCallback, useState } from 'react';
import { BooleanIcon, EditModal, EmbeddedList } from 'react-components';
import { Card, Form, Header } from 'semantic-ui-react';
import _ from 'underscore';
import ArtworkTitleModal from '../../components/ArtworkTitleModal';
import ArtworksService from '../../services/Artworks';
import AttachmentModal from '../../components/AttachmentModal';
import File from '../../transforms/File';
import i18n from '../../i18n/i18n';
import Images from '../../components/Images';
import ItemLabel from '../../components/ItemLabel';
import LocationModal, { LocationTypes } from '../../components/LocationModal';
import Number from '../../utils/Number';
import ParticipationModal, { ParticipationTypes } from '../../components/ParticipationModal';
import RecordHeader from '../../components/RecordHeader';
import SimpleEditPage from '../../components/SimpleEditPage';
import SimpleLink from '../../components/SimpleLink';
import Validations from '../../utils/Validations';
import ValueListDropdown from '../../components/ValueListDropdown';
import useEditPage from './EditPage';
import withMenuBar from '../../hooks/MenuBar';

import type { Artwork as ArtworkType } from '../../types/Artwork';
import type { EditPageProps } from './EditPage';
import type { Translateable } from '../../types/Translateable';

import './Artwork.css';

type Props = EditPageProps & Translateable & {
  item: ArtworkType
};

const Tabs = {
  details: 'details',
  physical: 'physical',
  images: 'images',
  creators: 'creators',
  locations: 'locations'
};

const Artwork = (props: Props) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const getImage = useCallback(() => {
    const image = _.find(props.item.attachments, (a) => a.primary && !a._destroy);
    return image && image.file_url;
  }, [props.item.attachments]);

  const getTitle = useCallback(() => {
    const title = _.find(props.item.artwork_titles, (t) => t.primary && !t._destroy);
    return title && title.title;
  }, [props.item.artwork_titles]);

  return (
    <SimpleEditPage
      artworkId={props.item.id}
      errors={props.errors}
      loading={props.loading}
      onSave={props.onSave}
      onTabClick={props.onTabClick}
      saving={props.saving}
      type={props.item.id ? undefined : props.t('Common.labels.artwork')}
    >
      <SimpleEditPage.Header>
        <RecordHeader
          className='artwork-header'
          description={(
            <ItemLabel
              content={props.t('Common.labels.artwork')}
              level={0}
            />
          )}
          header={getTitle()}
          id={props.item.id}
          image={getImage()}
          meta={props.item.date_descriptor}
          notes={props.item.notes_internal}
          published={props.item.published}
          onNotesChange={props.onTextInputChange.bind(this, 'notes_internal')}
          onPublish={props.onCheckboxInputChange.bind(this, 'published')}
          renderContent={() => (
            <>
              <div className='artwork-header-meta'>
                {props.item.created_by && props.item.created_by.name && (
                <div>
                  <span className='meta-label'>
                    {props.t('Artworks.filters.createdBy')}
                    {': '}
                  </span>
                  {props.item.created_by.name}
                </div>
                )}
                {props.item.updated_by && props.item.updated_by.name && (
                <div>
                  <span className='meta-label'>
                    {props.t('Artworks.filters.updatedBy')}
                    {': '}
                  </span>
                  {props.item.updated_by.name}
                </div>
                )}
                {props.item.created_at && (
                <div>
                  <span className='meta-label'>
                    {props.t('Artworks.filters.createdAt')}
                    {': '}
                  </span>
                  {new Date(props.item.created_at).toLocaleString('en-US')}
                </div>
                )}
                {props.item.updated_at && (
                <div>
                  <span className='meta-label'>
                    {props.t('Artworks.filters.updatedAt')}
                    {': '}
                  </span>
                  {new Date(props.item.updated_at).toLocaleString('en-US')}
                </div>
                )}
              </div>
              {(props.item.documents_count || props.item.documents_count === 0) && (
                <Card.Content
                  className='entered-visible-container'
                  extra
                  textAlign='center'
                >
                  {props.item.number_documents_visible || props.item.number_documents_visible === 0
                    ? props.t('RecordHeader.labels.documentsEnteredWithVisible',
                      {
                        entered: props.item.documents_count,
                        visible: props.item.number_documents_visible
                      })
                    : props.t('RecordHeader.labels.documentsEntered',
                      { entered: props.item.documents_count })}
                </Card.Content>
              )}
            </>
          )}
          url={`/admin/artworks/${props.item.id}`}
        />
      </SimpleEditPage.Header>
      <SimpleEditPage.Tab
        key={Tabs.details}
        name={props.t('Common.tabs.details')}
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
              required: ['title']
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
          content={props.t('Artwork.labels.documentsVisible')}
        />
        <Form.Input
          error={props.isError('number_documents_visible')}
          label={props.t('Artwork.labels.numberDocumentsVisible')}
          onChange={props.onTextInputChange.bind(this, 'number_documents_visible')}
          required={props.isRequired('number_documents_visible')}
          value={props.item.number_documents_visible || ''}
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
        key={Tabs.physical}
        name={props.t('Artwork.tabs.physical')}
      >
        <ValueListDropdown
          {...props}
          group='Object/Work Type'
          label={props.t('Artwork.labels.objectWorkType')}
          multiple
          object='Artwork'
        />
        <ValueListDropdown
          {...props}
          group='Material'
          label={props.t('Artwork.labels.materials')}
          multiple
          object='Artwork'
        />
        <ValueListDropdown
          {...props}
          group='Technique'
          label={props.t('Artwork.labels.techniques')}
          multiple
          object='Artwork'
        />
        <Form.Input
          error={props.isError('height')}
          label={props.t('Artwork.labels.height')}
          onChange={props.onTextInputChange.bind(this, 'height')}
          required={props.isRequired('height')}
          value={props.item.height || ''}
        />
        <Form.Input
          error={props.isError('width')}
          label={props.t('Artwork.labels.width')}
          onChange={props.onTextInputChange.bind(this, 'width')}
          required={props.isRequired('width')}
          value={props.item.width || ''}
        />
        <Form.Input
          error={props.isError('depth')}
          label={props.t('Artwork.labels.depth')}
          onChange={props.onTextInputChange.bind(this, 'depth')}
          required={props.isRequired('depth')}
          value={props.item.depth || ''}
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
            color: () => 'orange',
            icon: 'edit',
            name: 'edit',
            onClick: (item) => setSelectedImage(item)
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
        { selectedImage && (
          <EditModal
            component={AttachmentModal}
            extra={props.item.notes_internal}
            item={selectedImage}
            onClose={() => setSelectedImage(null)}
            onSave={(item) => {
              props.onSaveChildAssociation('attachments', item);
              setSelectedImage(null);
              return Promise.resolve();
            }}
          />
        )}
      </SimpleEditPage.Tab>
      <SimpleEditPage.Tab
        key={Tabs.creators}
        name={props.t('Artwork.tabs.creators')}
      >
        <EmbeddedList
          actions={[{
            name: 'edit'
          }, {
            name: 'copy'
          }, {
            name: 'delete'
          }]}
          columns={[{
            name: 'display_name',
            label: props.t('Artwork.participations.columns.name'),
            render: (p) => p.person && p.person.display_name && (
              <SimpleLink
                content={p.person.display_name}
                url={`/admin/people/${p.person_id}`}
              />
            )
          }, {
            name: 'nationality',
            label: props.t('Artwork.participations.columns.nationality'),
            resolve: (p) => p.person && p.person.nationality
          }, {
            name: 'role',
            label: props.t('Artwork.participations.columns.role')
          }]}
          items={props.item.participations}
          key='participations'
          modal={{
            component: ParticipationModal,
            props: {
              defaults: {
                participateable_type: 'Person'
              },
              required: ['person_id'],
              type: ParticipationTypes.person
            }
          }}
          onDelete={props.onDeleteChildAssociation.bind(this, 'participations')}
          onSave={props.onSaveChildAssociation.bind(this, 'participations')}
        />
        <br />
        <ValueListDropdown
          {...props}
          group='Commissioning Context'
          label={props.t('Artwork.labels.commissioningContext')}
          multiple
          object='Artwork'
          width={6}
        />
      </SimpleEditPage.Tab>
      <SimpleEditPage.Tab
        key={Tabs.locations}
        name={props.t('Common.tabs.locations')}
      >
        <EmbeddedList
          actions={[{
            name: 'edit'
          }, {
            name: 'copy'
          }, {
            name: 'delete'
          }]}
          columns={[{
            name: 'name',
            label: props.t('Artwork.locations.columns.name'),
            render: (l) => l.place && l.place.name && (
              <SimpleLink
                content={l.place.name}
                url={`/admin/places/${l.place_id}`}
              />
            )
          }, {
            name: 'country',
            label: props.t('Artwork.locations.columns.country'),
            resolve: (l) => l.place && l.place.country
          }, {
            name: 'role',
            label: props.t('Artwork.locations.columns.role')
          }]}
          items={props.item.locations}
          key='locations'
          modal={{
            component: LocationModal,
            props: {
              required: ['place_id'],
              type: LocationTypes.place
            }
          }}
          onDelete={props.onDeleteChildAssociation.bind(this, 'locations')}
          onSave={props.onSaveChildAssociation.bind(this, 'locations')}
        />
      </SimpleEditPage.Tab>
    </SimpleEditPage>
  );
};

export default useEditPage(withMenuBar(Artwork), {
  getArtworkId: (item) => item.id,
  onLoad: (id) => ArtworksService.fetchOne(id).then(({ data }) => data.artwork),
  onSave: (artwork) => ArtworksService.save(artwork).then(({ data }) => data.artwork),
  required: ['date_descriptor'],
  validate: (artwork) => {
    let validationErrors = {};

    // Validate start date
    if (!(_.isEmpty(artwork.date_start) || Number.isNumeric(artwork.date_start))) {
      validationErrors = _.extend(validationErrors, {
        date_start: i18n.t('Artwork.errors.dateNumeric', { name: i18n.t('Artwork.labels.startDate') })
      });
    }

    // Validate end date
    if (!(_.isEmpty(artwork.date_end) || Number.isNumeric(artwork.date_end))) {
      validationErrors = _.extend(validationErrors, {
        date_end: i18n.t('Artwork.errors.dateNumeric', { name: i18n.t('Artwork.labels.endDate') })
      });
    }

    // Validate number of visible documents
    if (!(_.isEmpty(artwork.number_documents_visible) || Number.isNumeric(artwork.number_documents_visible))) {
      validationErrors = _.extend(validationErrors, {
        number_documents_visible: i18n.t('Artwork.errors.documentsVisibleNumeric')
      });
    }

    // Validate height, width, depth
    validationErrors = _.extend(validationErrors, Validations.validateDimensions(artwork));

    return validationErrors;
  }
});
