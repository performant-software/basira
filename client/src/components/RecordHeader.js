// @flow

import React, { useState, type Element } from 'react';
import { FileInputButton, LazyImage } from 'react-components';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Card,
  Label,
  Popup
} from 'semantic-ui-react';
import _ from 'underscore';
import NotesModal from './NotesModal';
import './RecordHeader.css';

import type { EditContainerProps } from 'react-components/types';
import type { Translateable } from '../types/Translateable';

type Props = Translateable & {
  ...EditContainerProps,
  description?: string,
  header?: string,
  id?: string,
  image?: string,
  imageUpload?: boolean,
  includeInfoButton?: boolean,
  includeNotesButton?: boolean,
  includePublishButton?: boolean,
  preview?: string,
  published: boolean,
  meta?: string,
  notes: string,
  onFileDelete: () => void,
  onFileEdit: () => void,
  onFileUpload: (files: Array<File>) => void,
  onNotesChange: (notes: string) => void,
  onPublish: () => void,
  renderContent?: () => Element<any>,
  renderImage?: () => Element<any>,
  url?: string,
};

const POPUP_DELAY = 1000;

const RecordHeader = (props: Props) => {
  const [notesModal, setNotesModal] = useState(false);

  return (
    <Card.Content
      className='record-header'
    >
      <div
        className='image-container'
      >
        <LazyImage
          preview={props.preview}
          src={props.image}
        >
          { props.onFileUpload && (
            <FileInputButton
              color='green'
              content={props.t('RecordHeader.buttons.upload')}
              icon='cloud upload'
              onSelection={props.onFileUpload.bind(this)}
            />
          )}
          { props.image && props.onFileEdit && (
            <Button
              color='orange'
              content={props.t('RecordHeader.buttons.edit')}
              icon='edit'
              onClick={props.onFileEdit.bind(this)}
            />
          )}
          { props.image && props.onFileDelete && (
            <Button
              color='red'
              content={props.t('RecordHeader.buttons.remove')}
              icon='trash'
              onClick={props.onFileDelete.bind(this)}
            />
          )}
        </LazyImage>
      </div>
      { props.header && (
        <Card.Header
          content={props.header}
        />
      )}
      { props.meta && (
        <Card.Meta
          content={props.meta}
        />
      )}
      { props.description && (
        <Card.Description
          content={(
            <>
              {props.description}
              {props.id && (
                <Label
                  as='a'
                  content={props.id}
                  href={props.url}
                />
              )}
            </>
          )}
        />
      )}
      { props.renderContent && props.renderContent() }
      <Card.Content
        className='button-container'
        extra
        textAlign='center'
      >
        { props.includePublishButton && (
          <Popup
            content={props.t('RecordHeader.popups.publish.content')}
            header={props.t('RecordHeader.popups.publish.header')}
            hideOnScroll
            mouseEnterDelay={POPUP_DELAY}
            position='top right'
            trigger={(
              <Button
                basic
                color={props.published ? 'green' : undefined}
                icon='send'
                onClick={props.onPublish.bind(this)}
              />
            )}
          />
        )}
        { props.includeNotesButton && (
          <>
            <Popup
              content={props.t('RecordHeader.popups.notes.content')}
              header={props.t('RecordHeader.popups.notes.header')}
              hideOnScroll
              mouseEnterDelay={POPUP_DELAY}
              position='top right'
              trigger={(
                <Button
                  basic
                  color={_.isEmpty(props.notes) ? undefined : 'orange'}
                  icon='sticky note outline'
                  onClick={() => setNotesModal(true)}
                />
              )}
            />
            { notesModal && (
              <NotesModal
                notes={props.notes}
                onClose={() => setNotesModal(false)}
                onSave={props.onNotesChange.bind(this)}
                open
              />
            )}
          </>
        )}
      </Card.Content>
    </Card.Content>
  );
};

RecordHeader.defaultProps = {
  description: undefined,
  header: undefined,
  imageUpload: true,
  includeHcp: true,
  includeAwardWinner: true,
  includeFlagReview: true,
  includeInfoButton: true,
  includeLockButton: true,
  includeNotesButton: true,
  includePublishButton: true,
  meta: undefined,
  renderContent: undefined,
  renderImage: undefined
};

export default withTranslation()(RecordHeader);
