// @flow

import React, { useCallback, useState } from 'react';
import { FileUpload, PhotoViewer } from '@performant-software/semantic-components';
import { withTranslation } from 'react-i18next';
import { Button, Card, Image } from 'semantic-ui-react';
import _ from 'underscore';
import './Images.css';

import type { Translateable } from '../types/Translateable';

type Action = {
  accept?: (item: any) => boolean,
  color?: (item: any) => ?string,
  icon: string,
  name: string,
  onClick: (item: any) => void
};

type Props = Translateable & {
  actions: Array<Action>,
  items: Array<any>,
  onFilesAdded: (files: Array<File>) => void,
  renderImage: (item: any) => string
};

const Images = (props: Props) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [fileUpload, setFileUpload] = useState(false);

  /**
   * Returns the list of available actions for the passed item.
   *
   * @type {function(*): *}
   */
  const getActions = useCallback((item) => (
    _.filter(props.actions, (action) => !action.accept || action.accept(item))
  ), [props.actions]);

  return (
    <div
      className='images'
    >
      { fileUpload && (
        <Button
          color='red'
          content={props.t('Images.buttons.close')}
          icon='times'
          onClick={() => setFileUpload(false)}
        />
      )}
      { !fileUpload && (
        <Button
          content={props.t('Images.buttons.upload')}
          icon='cloud upload'
          onClick={() => setFileUpload(true)}
          primary
        />
      )}
      { fileUpload && (
        <FileUpload
          onFilesAdded={(files) => {
            props.onFilesAdded(files);
            setFileUpload(false);
          }}
          fileTypes={['jpg', 'jpeg', 'JPG', 'JPEG']}
        />
      )}
      <Card.Group
        itemsPerRow={3}
      >
        { _.map(props.items, (item, index) => (
          <Card
            key={index}
            onClick={() => setCurrentImage(item)}
          >
            <Image
              src={props.renderImage(item)}
            />
            { props.actions && (
              <Card.Content
                extra
                textAlign='center'
              >
                { _.map(getActions(item), (action) => (
                  <Button
                    basic
                    color={action.color && action.color(item)}
                    icon={action.icon}
                    key={action.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick(item);
                    }}
                  />
                ))}
              </Card.Content>
            )}
          </Card>
        ))}
      </Card.Group>
      { currentImage && (
        <PhotoViewer
          image={currentImage.file_url}
          onClose={() => setCurrentImage(null)}
          open
          size='large'
        />
      )}
    </div>
  );
};

export default withTranslation()(Images);
