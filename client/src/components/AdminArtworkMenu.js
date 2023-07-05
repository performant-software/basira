// @flow

import { LazyImage, Selectize } from '@performant-software/semantic-components';
import React, { useCallback, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Confirm,
  Grid,
  Item,
  Modal
} from 'semantic-ui-react';
import _ from 'underscore';
import ArtworkMenu, { ItemTypes, type ItemType } from './ArtworkMenu';
import ArtworksService from '../services/Artworks';
import DocumentsService from '../services/Documents';
import { getPhysicalComponents, getVisualContexts } from '../utils/Artwork';
import ItemLabel from './ItemLabel';
import PhysicalComponentsService from '../services/PhysicalComponents';
import Session from '../services/Session';
import VisualContextsService from '../services/VisualContexts';
import './AdminArtworkMenu.css';

type DeleteItemType = ItemType & {
  onDelete: () => Promise<any>
};

type ReorderItemType = ItemType & {
  onReorder: (parentId: number) => Promise<any>
};

type Props = {
  artworkId: number
};

const AdminArtworkMenu = (props: Props) => {
  const [deleteItem, setDeleteItem] = useState<DeleteItemType | null>(null);
  const [reorderItem, setReorderItem] = useState<ReorderItemType | null>(null);
  const [physicalComponents, setPhysicalComponents] = useState();
  const [saved, setSaved] = useState(0);
  const [visualContexts, setVisualContexts] = useState();

  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  /**
   * Returns true if the passed item, or its child at any level, is the active item.
   *
   * @param item
   *
   * @returns {boolean}
   */
  const isItemOrChildActive = useCallback((item: ItemType) => {
    if (location.pathname.match(item.path)) {
      return true;
    }

    if (item.children) {
      return _.some(item.children, (child) => isItemOrChildActive(child));
    }

    return false;
  }, [location.pathname]);

  /**
   * Called after an item has been deleted.
   *
   * @type {(function(): void)|*}
   */
  const afterDelete = useCallback(() => {
    // If we're deleting the active record, or a parent of the active record, navigate to the
    // nearest remaining parent. If there's no remaining parent, navigate to artworks list.
    if (deleteItem && isItemOrChildActive(deleteItem)) {
      history.push(deleteItem.parent?.path || '/admin/artworks');
    } else {
      setDeleteItem(null);
      setSaved((prevSaved) => prevSaved + 1);
    }
  }, [deleteItem, isItemOrChildActive]);

  /**
   * Sets the physical components and visual contexts on the state after the artwork has been loaded. This is done
   * for the re-ordering functionality.
   *
   * @type {(function(*): void)|*}
   */
  const onLoad = useCallback((artwork) => {
    setPhysicalComponents(getPhysicalComponents(artwork));
    setVisualContexts(getVisualContexts(artwork));
  }, []);

  /**
   * Returns a promise resolving the list of parent records.
   *
   * @type {(function(): (Promise<unknown>))|*}
   */
  const onParentLoad = useCallback(() => {
    if (!reorderItem) {
      return Promise.reject();
    }

    const items = reorderItem.type === ItemTypes.document
      ? visualContexts
      : physicalComponents;

    return Promise.resolve({
      data: {
        items,
        list: {
          count: items?.length,
          pages: 1
        }
      }
    });
  }, [reorderItem]);

  /**
   * Reorders the item with the passed ID.
   *
   * @type {(function([{id: *}]): void)|*}
   */
  const onSaveReorder = useCallback(([{ id }]) => {
    if (!reorderItem) {
      return;
    }

    reorderItem
      .onReorder(id)
      .then(() => {
        setReorderItem(null);
        setSaved((prevSaved) => prevSaved + 1);
      });
  }, [reorderItem]);

  /**
   * Renders the actions for the passed item.
   *
   * @type {function({addPath?: *, onDelete?: *, onReorder?: *, path?: *})}
   */
  const renderActions = useCallback(({
    addPath = null,
    onDelete = null,
    onReorder = null,
    path = null
  }) => (
    <Button.Group
      className='action-buttons'
      color='black'
      compact
    >
      { addPath && (
        <Button
          as={Link}
          icon='plus'
          to={addPath}
        />
      )}
      { onReorder && (
        <Button
          icon='arrows alternate vertical'
          onClick={(e) => {
            e.stopPropagation();
            onReorder();
          }}
        />
      )}
      { path && (
        <Button
          as={Link}
          icon='edit'
          to={`/admin${path}`}
        />
      )}
      { Session.isAdmin() && onDelete && (
        <Button
          icon='times'
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      )}
    </Button.Group>
  ), []);

  /**
   * Returns the delete modal content.
   *
   * @type {unknown}
   */
  const renderDeleteContent = useCallback(() => {
    if (!deleteItem) {
      return null;
    }

    return (
      <Modal.Content>
        { t('AdminArtworkMenu.deleteContent', { name: deleteItem.name }) }
      </Modal.Content>
    );
  }, [deleteItem]);

  /**
   * Returns the delete modal header.
   *
   * @type {unknown}
   */
  const renderDeleteHeader = useCallback(() => {
    if (!deleteItem) {
      return null;
    }

    return (
      <Modal.Header>
        <Grid
          columns={2}
        >
          <Grid.Column>
            { t('AdminArtworkMenu.deleteHeader') }
          </Grid.Column>
          <Grid.Column
            textAlign='right'
          >
            <ItemLabel
              content={deleteItem.type}
              level={deleteItem.level}
            />
          </Grid.Column>
        </Grid>
      </Modal.Header>
    );
  }, [deleteItem]);

  /**
   * Renders the actions for the passed item based on the item type.
   *
   * @type {(function(ItemType): (*|null))|*}
   */
  const renderRight = useCallback((item: ItemType) => {
    // Artwork type
    if (item.type === ItemTypes.artwork) {
      return renderActions({
        addPath: {
          pathname: '/admin/physical_components/new',
          state: {
            artwork_id: item.id
          }
        },
        onDelete: () => setDeleteItem({
          ...item,
          onDelete: () => ArtworksService.delete(item)
        }),
        path: item.path
      });
    }

    // Physical component type
    if (item.type === ItemTypes.physicalComponent) {
      return renderActions({
        addPath: {
          pathname: '/admin/visual_contexts/new',
          state: {
            artwork_id: props.artworkId,
            physical_component_id: item.id
          }
        },
        onDelete: () => setDeleteItem({
          ...item,
          onDelete: () => PhysicalComponentsService.delete(item)
        }),
        path: item.path
      });
    }

    // Visual context type
    if (item.type === ItemTypes.visualContext) {
      return renderActions({
        addPath: {
          pathname: '/admin/documents/new',
          state: {
            artwork_id: props.artworkId,
            visual_context_id: item.id
          }
        },
        onDelete: () => setDeleteItem({
          ...item,
          onDelete: () => VisualContextsService.delete(item)
        }),
        onReorder: () => setReorderItem({
          ...item,
          onReorder: (parentId) => VisualContextsService.save({
            id: item.id,
            physical_component_id: parentId
          })
        }),
        path: item.path
      });
    }

    // Document type
    if (item.type === ItemTypes.document) {
      return renderActions({
        onDelete: () => setDeleteItem({
          ...item,
          onDelete: () => DocumentsService.delete(item)
        }),
        onReorder: () => setReorderItem({
          ...item,
          onReorder: (parentId) => DocumentsService.save({
            id: item.id,
            visual_context_id: parentId
          })
        }),
        path: item.path
      });
    }

    return null;
  }, [renderActions, props.artworkId]);

  return (
    <>
      <ArtworkMenu
        className='admin'
        id={props.artworkId}
        onLoad={onLoad}
        renderRight={renderRight}
        saved={saved}
      />
      { deleteItem && (
        <Confirm
          content={renderDeleteContent}
          header={renderDeleteHeader}
          open
          onCancel={() => setDeleteItem(null)}
          onConfirm={() => deleteItem.onDelete().then(afterDelete)}
        />
      )}
      { reorderItem && (
        <Selectize
          collectionName='items'
          className='selectize-parent-select'
          onClose={() => setReorderItem(null)}
          onLoad={onParentLoad}
          onSave={onSaveReorder}
          multiple={false}
          renderItem={(item) => (
            <Item.Group>
              <Item>
                <Item.Image
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
                </Item.Image>
                <Item.Content>
                  <Item.Header>
                    { item.name }
                  </Item.Header>
                </Item.Content>
              </Item>
            </Item.Group>
          )}
          searchable={false}
          title={reorderItem.type === ItemTypes.document
            ? t('Document.popups.changeVisualContext.header')
            : t('VisualContext.popups.changePhysicalComponent.header')}
        />
      )}
    </>
  );
};

export default AdminArtworkMenu;
