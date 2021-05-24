// @flow

import React, { useEffect, useState } from 'react';
import { NestedAccordion } from 'react-components';
import { withRouter } from 'react-router-dom';
import {
  Button, Confirm,
  Image,
  Label,
  Loader
} from 'semantic-ui-react';
import _ from 'underscore';
import ArtworksService from '../services/Artworks';
import PhysicalComponentsService from '../services/PhysicalComponents';
import './AccordionMenu.css';

import type { Routeable } from '../types/Routeable';

type Item = {
  onDelete: () => void
};

type Props = Routeable & {
  id: number
};

const AccordionMenu = (props: Props) => {
  const [artwork, setArtwork] = useState(null);
  const [defaultActive, setDefaultActive] = useState([]);
  const [selectedItem, setSelectedItem] = useState<?Item>(null);

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
      activeIds.push(item.id);
      active = true;
    } else {
      _.each(item.children, (child) => {
        if (isActive(child, activeIds)) {
          activeIds.push(item.id);
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
   */
  const isItemActive = (item) => props.location.pathname.match(item.path);

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
      <Label
        color={item.color}
        content={item.type}
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
   * Transforms the passed physical component to a nested structure.
   *
   * @param pc
   *
   * @returns {{image: (*|string|string), path: string, color: string, level: number, name, id, type: string}}
   */
  const transformPhysicalComponent = (pc) => ({
    id: pc.id,
    name: pc.name,
    image: pc.primary_attachment && pc.primary_attachment.thumbnail_url,
    type: 'Physical Component',
    level: 1,
    color: 'orange',
    path: `/admin/physical_components/${pc.id}`,
    onDelete: () => PhysicalComponentsService.delete(pc)
  });

  /**
   * Transforms the passed artwork to a  nested structure.
   *
   * @param a
   *
   * @returns {{image: (*|string|string), path: string, color: string, level: number,
   * children, name: *, id, type: string}}
   */
  const transformArtwork = (a) => ({
    id: a.id,
    name: a.primary_title && a.primary_title.title,
    image: a.primary_attachment && a.primary_attachment.thumbnail_url,
    type: 'Artwork',
    level: 0,
    color: 'blue',
    path: `/admin/artworks/${a.id}`,
    onAdd: () => props.history.push('/admin/physical_components/new', { artwork_id: a.id }),
    onDelete: () => ArtworksService.delete(a),
    children: _.map(a.physical_components, transformPhysicalComponent.bind(this))
  });

  /**
   * Calls the ArtworksService to load the data.
   */
  useEffect(() => {
    if (props.id) {
      ArtworksService
        .fetchNested(props.id)
        .then(({ data }) => {
          setArtwork(transformArtwork(data.artwork));
        });
    }
  }, [props.id]);

  /**
   * Sets the default active items.
   */
  useEffect(() => {
    if (artwork) {
      const active = [];
      isActive(artwork, active);

      setDefaultActive(active);
    }
  }, [artwork]);

  return (
    <div
      className='accordion-menu'
    >
      { !artwork && (
        <Loader
          active
        />
      )}
      { artwork && (
        <>
          <NestedAccordion
            defaultActive={defaultActive}
            getChildItems={(item) => item.children}
            inverted
            isItemActive={isItemActive.bind(this)}
            onItemToggle={() => {}}
            rootItems={[artwork]}
            renderItem={renderItem.bind(this)}
            renderRight={renderActions.bind(this)}
            showToggle={(item) => !_.isEmpty(item.children)}
            styled={false}
            toggleOnClick
          />
          <Confirm
            open={!!selectedItem}
            onCancel={() => setSelectedItem(null)}
            onConfirm={() => {
              if (selectedItem) {
                selectedItem.onDelete();
                setSelectedItem(null);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default withRouter(AccordionMenu);
