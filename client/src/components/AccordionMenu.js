// @flow

import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { LazyImage, NestedAccordion, Selectize } from '@performant-software/semantic-components';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Confirm,
  Grid,
  Image,
  Item as SemanticItem,
  Loader,
  Modal
} from 'semantic-ui-react';
import _ from 'underscore';
import ArtworksService from '../services/Artworks';
import DocumentsService from '../services/Documents';
import ItemLabel from './ItemLabel';
import { getPhysicalComponents, getVisualContexts } from '../utils/Artwork';
import PhysicalComponentsService from '../services/PhysicalComponents';
import VisualContextsService from '../services/VisualContexts';
import './AccordionMenu.css';

import type { Routeable } from '../types/Routeable';
import type { Translateable } from '../types/Translateable';

type Item = {
  children?: [],
  level: number,
  name: string,
  parent?: Item,
  path: string,
  onDelete: () => Promise<any>,
  type: string
};

type Props = Routeable & Translateable & {
  id: number
};

const CHILD_TYPES = ['Document', 'Visual Context'];

const AccordionMenu = (props: Props) => {
  const [artwork, setArtwork] = useState(null);
  const [defaultActive, setDefaultActive] = useState([]);
  const [selectedItem, setSelectedItem] = useState<?Item>(null);
  const [reorderItem, setReorderItem] = useState<?Item>(null);

  /**
   * Calls the ArtworksService to load the data.
   */
  const fetchData = useCallback(() => {
    ArtworksService
      .fetchNested(props.id)
      .then(({ data }) => {
        setArtwork(transformArtwork(data.artwork));
      });
  }, [props.id]);

  const physicalComponents = useMemo(() => (
    artwork ? getPhysicalComponents(artwork) : []
  ), [artwork]);

  const visualContexts = useMemo(() => (
    artwork ? getVisualContexts(artwork) : []
  ), [artwork]);

  /**
   * Returns true if the passed item or any of its children is active. The IDs are also added to the list of
   * active IDs.
   *
   * @param item
   * @param activeIds
   *
   * @returns {boolean}
   */
  const isActive = (item, activeIds) => {
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
  };

  /**
   * Returns true if the passed item is the active item.
   *
   * @param item
   *
   * @returns {RegExp$matchResult}
   */
  const isItemActive = (item: Item) => props.location.pathname.match(item.path);

  /**
   * Returns true if the passed item, or its child at any level, is the active item.
   *
   * @param item
   *
   * @returns {boolean}
   */
  const isItemOrChildActive = (item: Item) => {
    if (props.location.pathname.match(item.path)) {
      return true;
    }
    if (item.children) {
      return _.some(item.children, (child) => isItemOrChildActive(child));
    }
    return false;
  };

  /**
   * Deletes the selected item and refreshes the data, or navigates to the nearest parent.
   *
   * @type {function(): void}
   */
  const onDelete = useCallback(() => {
    if (selectedItem) {
      selectedItem
        .onDelete()
        .then(() => {
          // If we're deleting the active record, or a parent of the active record, navigate to the
          // nearest remaining parent. If there's no remaining parent, navigate to artworks list.
          if (isItemOrChildActive(selectedItem)) {
            const redirectPath = (selectedItem.parent && selectedItem.parent.path)
              ? selectedItem.parent.path
              : '/admin/artworks';
            props.history.push(redirectPath);
          } else {
            setSelectedItem(null);
            fetchData();
          }
        });
    }
  }, [selectedItem]);

  /**
   * Renders the actions for the passed item.
   *
   * @param item
   *
   * @returns {JSX.Element}
   */
  const renderActions = (item) => (
    <Button.Group
      className='action-buttons'
      color='black'
      compact
    >
      { item.onAdd && (
        <Button
          icon='plus'
          onClick={(e) => {
            e.stopPropagation();
            item.onAdd();
          }}
        />
      )}
      { CHILD_TYPES.includes(item.type) && (
        <Button
          icon='arrows alternate vertical'
          onClick={() => setReorderItem(item)}
        />
      )}
      { item.path && (
        <Button
          icon='edit'
          onClick={(e) => {
            e.stopPropagation();
            props.history.push(item.path);
          }}
        />
      )}
      { item.onDelete && (
        <Button
          icon='times'
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(item);
          }}
        />
      )}
    </Button.Group>
  );

  /**
   * Renders the passed item.
   *
   * @param item
   *
   * @returns {JSX.Element}
   */
  const renderItem = (item) => (
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
  );

  /**
   * Transforms the passed artwork to a  nested structure.
   *
   * @param a
   *
   * @returns {{image: (*|string|string), path: string, onDelete: (function(): Q.Promise<AxiosResponse<T>>),
   * level: number, children, name: *, id, type: string, onAdd: (function(): *)}}
   */
  const transformArtwork = (a) => ({
    id: a.id,
    name: a.primary_title && a.primary_title.title,
    image: a.primary_attachment && a.primary_attachment.thumbnail_url,
    type: 'Artwork',
    level: 0,
    path: `/admin/artworks/${a.id}`,
    onAdd: () => props.history.push('/admin/physical_components/new', { artwork_id: a.id }),
    onDelete: () => ArtworksService.delete(a),
    children: _.map(a.physical_components, transformPhysicalComponent.bind(this, a))
  });

  /**
   * Transforms the passed document to a nested structure.
   *
   * @param parent
   * @param doc
   *
   * @returns {{image: (*|string|string), path: string, parent, onDelete: (function(): Q.Promise<AxiosResponse<T>>),
   * level: number, name, id, type: string}}
   */
  const transformDocument = (parent, doc) => ({
    id: doc.id,
    name: doc.name,
    image: doc.primary_attachment && doc.primary_attachment.thumbnail_url,
    type: 'Document',
    level: 3,
    path: `/admin/documents/${doc.id}`,
    parent: { ...parent, path: `/admin/visual_contexts/${parent.id}` },
    onDelete: () => DocumentsService.delete(doc)
  });

  /**
   * Transforms the passed physical component to a nested structure.
   *
   * @param parent
   * @param pc
   *
   * @returns {{image: (*|string|string), path: string, parent, onDelete: (function(): Q.Promise<AxiosResponse<T>>),
   * level: number, children, name, id, type: string, onAdd: (function(): *)}}
   */
  const transformPhysicalComponent = (parent, pc) => ({
    id: pc.id,
    name: pc.name,
    image: pc.primary_attachment && pc.primary_attachment.thumbnail_url,
    type: 'Physical Component',
    level: 1,
    path: `/admin/physical_components/${pc.id}`,
    parent: { ...parent, path: `/admin/artworks/${parent.id}` },
    onAdd: () => props.history.push('/admin/visual_contexts/new', {
      artwork_id: props.id,
      physical_component_id: pc.id
    }),
    onDelete: () => PhysicalComponentsService.delete(pc),
    children: _.map(pc.visual_contexts, transformVisualContext.bind(this, pc))
  });

  /**
   * Transforms the passed visual context to a nested structure.
   *
   * @param parent
   * @param vc
   *
   * @returns {{image: (*|string|string), path: string, parent, onDelete: (function(): Q.Promise<AxiosResponse<T>>),
   * level: number, children, name, id, type: string, onAdd: (function(): *)}}
   */
  const transformVisualContext = (parent, vc) => ({
    id: vc.id,
    name: vc.name,
    image: vc.primary_attachment && vc.primary_attachment.thumbnail_url,
    type: 'Visual Context',
    level: 2,
    path: `/admin/visual_contexts/${vc.id}`,
    parent: { ...parent, path: `/admin/physical_components/${parent.id}` },
    onAdd: () => props.history.push('/admin/documents/new', { artwork_id: props.id, visual_context_id: vc.id }),
    onDelete: () => VisualContextsService.delete(vc),
    children: _.map(vc.documents, transformDocument.bind(this, vc))
  });

  /**
   * Returns the delete modal content.
   *
   * @type {unknown}
   */
  const renderDeleteContent = useCallback(() => {
    if (!selectedItem) {
      return null;
    }

    return (
      <Modal.Content>
        { props.t('AccordionMenu.deleteContent', { name: selectedItem.name }) }
      </Modal.Content>
    );
  }, [selectedItem]);

  /**
   * Returns the delete modal header.
   *
   * @type {unknown}
   */
  const renderDeleteHeader = useCallback(() => {
    if (!selectedItem) {
      return null;
    }

    return (
      <Modal.Header>
        <Grid
          columns={2}
        >
          <Grid.Column>
            { props.t('AccordionMenu.deleteHeader') }
          </Grid.Column>
          <Grid.Column
            textAlign='right'
          >
            <ItemLabel
              content={selectedItem.type}
              level={selectedItem.level}
            />
          </Grid.Column>
        </Grid>
      </Modal.Header>
    );
  }, [selectedItem]);

  /**
   * Fetches the data.
   */
  useEffect(() => {
    if (props.id) {
      fetchData();
    }
  }, [props.id, fetchData]);

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

  const changeParent = useCallback((item: any, newParentId: number) => {
    if (item.type === 'Document') {
      return DocumentsService
        .save({
          id: item.id,
          visual_context_id: newParentId
        })
        .then(() => {
          setReorderItem(null);
          fetchData();
        });
    }

    return VisualContextsService
      .save({
        id: item.id,
        physical_component_id: newParentId
      })
      .then(() => {
        setReorderItem(null);
        fetchData();
      });
  }, [reorderItem?.type]);

  return (
    <div
      className='accordion-menu'
    >
      { !artwork && (
        <Loader
          active
        />
      )}
      { reorderItem && (
        <Selectize
          collectionName='items'
          className='selectize-parent-select'
          onClose={() => setReorderItem(null)}
          onLoad={() => Promise.resolve({
              data: {
                items: reorderItem.type === 'Document' ? visualContexts : physicalComponents,
                list: {
                  count: reorderItem.type === 'Document'
                    ? visualContexts.length
                    : physicalComponents.length,
                  pages: 1
                }
              }
          })}
          onSave={(items) => changeParent(reorderItem, items[0].id)}
          multiple={false}
          renderItem={(item) => (
            <SemanticItem.Group>
              <SemanticItem>
                <SemanticItem.Image
                  style={{
                    width: 'unset'
                  }}
                >
                  <LazyImage
                    image={{
                      alt: item.name
                    }}
                    size='tiny'
                    name={item.name}
                    src={item.image}
                  />
                </SemanticItem.Image>
                <SemanticItem.Content>
                  <SemanticItem.Header>
                    {item.name}
                  </SemanticItem.Header>
                </SemanticItem.Content>
              </SemanticItem>
            </SemanticItem.Group>
          )}
          searchable={false}
          title={reorderItem.type === 'Document'
            ? props.t('Document.popups.changeVisualContext.header')
            : props.t('VisualContext.popups.changePhysicalComponent.header')}
        />
        )}
      { artwork && (
        <>
          <NestedAccordion
            defaultActive={defaultActive}
            getChildItems={(item) => item.children}
            inverted
            isItemActive={isItemActive.bind(this)}
            multipleItemTypes
            onItemToggle={() => {}}
            rootItems={[artwork]}
            renderItem={renderItem.bind(this)}
            renderRight={renderActions.bind(this)}
            showToggle={(item) => !_.isEmpty(item.children)}
            styled={false}
            toggleOnClick
          />
          <Confirm
            content={renderDeleteContent}
            header={renderDeleteHeader}
            open={!!selectedItem}
            onCancel={() => setSelectedItem(null)}
            onConfirm={onDelete}
          />
        </>
      )}
    </div>
  );
};

export default withTranslation()(withRouter(AccordionMenu));
