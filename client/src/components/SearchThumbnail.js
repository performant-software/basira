// @flow

import { ImageCarousel, LazyImage } from '@performant-software/semantic-components';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Label } from 'semantic-ui-react';
import _ from 'underscore';
import { type Document } from '../types/search/Document';
import './SearchThumbnail.css';

type Props = {
  document: Document
};

const SearchThumbnail = (props: Props) => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();

  /**
   * Sets the images for the current document.
   *
   * @type {[]}
   */
  const images = useMemo(() => {
    const items = [];

    if (props.document.image_url) {
      items.push({
        caption: props.document.name,
        src: props.document.image_url
      });
    }

    _.each(props.document.artwork?.image_urls, (url) => {
      items.push({
        caption: props.document.artwork.name,
        src: url
      });
    });

    return items;
  }, [props.document]);

  if (_.isEmpty(images)) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={(e) => e.preventDefault()}
    >
      <Image
        className='search-images'
        onClick={() => setModal(true)}
      >
        <LazyImage
          dimmable={false}
          src={props.document.thumbnail_url}
        />
        { images.length > 1 && (
          <Label
            circular
            content={t('SearchThumbnail.labels.imageCount', { count: images.length - 1 })}
            size='large'
          />
        )}
      </Image>
      { modal && (
        <ImageCarousel
          images={images}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  );
};

export default SearchThumbnail;
