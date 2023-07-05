// @flow

import classNames from 'classnames';
import { NestedAccordion } from '@performant-software/semantic-components';
import React, {
  useCallback,
  useEffect,
  useState,
  type Node
} from 'react';
import { Image, Loader } from 'semantic-ui-react';
import _ from 'underscore';
import ArtworksService from '../services/Artworks';
import DocumentsService from '../services/Documents';
import ItemLabel from './ItemLabel';
import { useLocation } from 'react-router-dom';
import './ArtworkMenu.css';

type ItemType = {
  id: number,
  children?: [],
  level: number,
  name: string,
  parent?: ItemType,
  path: string,
  onDelete?: () => Promise<any>,
  type: string
};

type Props = {
  className?: string,
  id: number,
  onLoad?: (item: ItemType) => void,
  renderRight?: (item: ItemType) => Node | null,
  saved?: number
};

const ItemTypes = {
  artwork: 'Artwork',
  document: 'Document',
  physicalComponent: 'Physical Component',
  visualContext: 'Visual Context'
};

const ArtworkMenu = (props: Props) => {
  const [artwork, setArtwork] = useState(null);
  const [defaultActive, setDefaultActive] = useState([]);

  const location = useLocation();

  /**
   * Calls the ArtworksService to load the data.
   */
  const fetchData = useCallback(() => {
    ArtworksService
      .fetchNested(props.id)
      .then(({ data }) => {
        const transformed = transformArtwork(data.artwork);

        // Set the transformed artwork on the set
        setArtwork(transformed);

        // Call the onLoad prop with the transformed artwork, if provided
        if (props.onLoad) {
          props.onLoad(transformed);
        }
      });
  }, [props.id]);

  /**
   * Returns true if the passed item is the active item.
   *
   * @param item
   *
   * @returns {RegExp$matchResult}
   */
  const isItemActive = useCallback((item: ItemType) => location.pathname.match(item.path), [location.pathname]);

  /**
   * Returns true if the passed item or any of its children is active. The IDs are also added to the list of
   * active IDs.
   *
   * @param item
   * @param activeIds
   *
   * @returns {boolean}
   */
  const isActive = useCallback((item, activeIds) => {
    let active = false;

    if (isItemActive(item)) {
      activeIds.push({
        id: item.id,
        type: item.type
      });
      active = true;
    } else {
      _.each(item.children, (child) => {
        if (isActive(child, activeIds)) {
          activeIds.push({
            id: item.id,
            type: item.type
          });
          active = true;
        }
      });
    }

    return active;
  }, [isItemActive]);

  /**
   * Renders the passed item.
   *
   * @param item
   *
   * @returns {JSX.Element}
   */
  const renderItem = useCallback((item) => (
    <div
      className='item'
      style={{
        marginLeft: `${item.level}em`
      }}
    >
      <ItemLabel
        content={item.type}
        level={item.level}
      />
      { item.image && (
        <Image
          src={item.image}
        />
      )}
      <div
        className='title'
      >
        { item.name }
      </div>
    </div>
  ), []);

  /**
   * Renders the right side of the menu if the "renderRight" prop is provided.
   *
   * @type {unknown}
   */
  const renderRight = useCallback((item) => (
    props.renderRight && props.renderRight(item)
  ), [props.renderRight]);

  /**
   * Transforms the passed document to a nested structure.
   *
   * @param parent
   * @param doc
   *
   * @returns {{image: (*|string|string), path: string, parent, onDelete: (function(): Q.Promise<AxiosResponse<T>>),
   * level: number, name, id, type: string}}
   */
  const transformDocument = useCallback((parent, doc) => ({
    id: doc.id,
    name: doc.name,
    image: doc.primary_attachment && doc.primary_attachment.thumbnail_url,
    type: ItemTypes.document,
    level: 3,
    path: `/documents/${doc.id}`,
    parent: { ...parent, path: `/admin/visual_contexts/${parent.id}` },
    onDelete: () => DocumentsService.delete(doc)
  }), []);

  /**
   * Transforms the passed visual context to a nested structure.
   *
   * @param parent
   * @param vc
   *
   * @returns {{image: (*|string|string), path: string, parent, onDelete: (function(): Q.Promise<AxiosResponse<T>>),
   * level: number, children, name, id, type: string, onAdd: (function(): *)}}
   */
  const transformVisualContext = useCallback((parent, vc) => ({
      id: vc.id,
      name: vc.name,
      image: vc.primary_attachment && vc.primary_attachment.thumbnail_url,
      type: ItemTypes.visualContext,
      level: 2,
      path: `/visual_contexts/${vc.id}`,
      parent: { ...parent, path: `/physical_components/${parent.id}` },
      children: _.map(vc.documents, transformDocument.bind(this, vc))
  }), [transformDocument]);

  /**
   * Transforms the passed physical component to a nested structure.
   *
   * @param parent
   * @param pc
   *
   * @returns {{image: (*|string|string), path: string, parent, onDelete: (function(): Q.Promise<AxiosResponse<T>>),
   * level: number, children, name, id, type: string, onAdd: (function(): *)}}
   */
  const transformPhysicalComponent = useCallback((parent, pc) => ({
    id: pc.id,
    name: pc.name,
    image: pc.primary_attachment && pc.primary_attachment.thumbnail_url,
    type: ItemTypes.physicalComponent,
    level: 1,
    path: `/physical_components/${pc.id}`,
    parent: { ...parent, path: `/artworks/${parent.id}` },
    children: _.map(pc.visual_contexts, transformVisualContext.bind(this, pc))
  }), [transformVisualContext]);

  /**
   * Transforms the passed artwork to a nested structure.
   *
   * @param a
   *
   * @returns {{image: (*|string|string), path: string, onDelete: (function(): Q.Promise<AxiosResponse<T>>),
   * level: number, children, name: *, id, type: string, onAdd: (function(): *)}}
   */
  const transformArtwork = useCallback((a) => ({
    id: a.id,
    name: a.primary_title && a.primary_title.title,
    image: a.primary_attachment && a.primary_attachment.thumbnail_url,
    type: ItemTypes.artwork,
    level: 0,
    path: `/artworks/${a.id}`,
    children: _.map(a.physical_components, transformPhysicalComponent.bind(this, a))
  }), [transformPhysicalComponent]);

  /**
   * Fetches the data.
   */
  useEffect(() => {
    if (props.id) {
      fetchData();
    }
  }, [fetchData, props.id, props.saved]);

  /**
   * Sets the default active items.
   */
  useEffect(() => {
    if (artwork) {
      const active = [];
      isActive(artwork, active);

      _.each(artwork.children, (child) => {
        active.push({
          id: child.id,
          type: child.type
        });
        _.each(child.children, (child_) => {
          active.push({
            id: child_.id,
            type: child_.type
          });
        });
      });

      setDefaultActive(active);
    }
  }, [artwork]);

  return (
    <div
      className={classNames('artwork-menu', props.className)}
    >
      { !artwork && (
        <Loader
          active
        />
      )}
      { artwork && (
        <NestedAccordion
          defaultActive={defaultActive}
          getChildItems={(item) => item.children}
          inverted
          isItemActive={isItemActive}
          multipleItemTypes
          onItemToggle={() => {}}
          rootItems={[artwork]}
          renderItem={renderItem}
          renderRight={renderRight}
          showToggle={(item) => !_.isEmpty(item.children)}
          styled={false}
          toggleOnClick
        />
      )}
    </div>
  );
};

ArtworkMenu.defaultProps = {
  className: undefined,
  onLoad: undefined,
  renderRight: undefined,
  saved: undefined
};

export default ArtworkMenu;

export {
  ItemTypes
};

export type {
  ItemType
};
