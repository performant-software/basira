// @flow

import React, { useState, type Element } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Card,
  Popup
} from 'semantic-ui-react';
import _ from 'underscore';
import NotesModal from './NotesModal';
import Thumbnail from './Thumbnail';
import './RecordHeader.css';

import type { EditContainerProps } from 'react-components/types';
import type { Translateable } from '../types/Translateable';

type Props = Translateable & {
  ...EditContainerProps,
  description?: string,
  header?: string,
  image?: string,
  imageUpload?: boolean,
  includeInfoButton?: boolean,
  includeNotesButton?: boolean,
  includePublishButton?: boolean,
  published: boolean,
  meta?: string,
  notes: string,
  onNotesChange: (notes: string) => void,
  onPublish: () => void,
  renderContent?: () => Element<any>,
  renderImage?: () => Element<any>
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
        <Thumbnail
          src={props.image}
        />
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
          content={props.description}
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
