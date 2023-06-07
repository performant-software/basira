// @flow

import React, { type ComponentType } from 'react';
import { ItemList } from '@performant-software/semantic-components';
import { withRouter, Location, RouterHistory } from 'react-router-dom';
import _ from 'underscore';
import { Container } from 'semantic-ui-react';

type Props = {
  addButton?: {
    color?: string,
    location?: string
  },
  className?: string,
  collectionName: string,
  filters?: {
    component: ComponentType<any>,
    props: any,
    exclude?: Array<string>
  },
  location: typeof Location,
  history: typeof RouterHistory,
  onLoad: (params: any) => Promise<any>,
  route: string
};

const AdminItemList = (props: Props) => {
  const { saved } = props.location.state || false;

  /**
   * Returns the class names for the AdminItemList component.
   *
   * @returns {string}
   */
  const getClassName = () => {
    const classNames = ['admin-item-list'];

    if (props.className) {
      classNames.push(props.className);
    }

    return classNames.join(' ');
  };

  return (
    <Container>
      <ItemList
        {...props}
        className={getClassName()}
        actions={[{
          name: 'edit',
          onClick: (item) => props.history.push(`/admin/${props.route}/${item.id}`)
        }, {
          name: 'copy',
          onClick: (item) => props.history.push(`/admin/${props.route}/${item.id}`)
        }, {
          name: 'delete'
        }]}
        addButton={_.defaults(props.addButton, {
          basic: false,
          color: 'green',
          location: 'top',
          onClick: () => props.history.push(`/admin/${props.route}/new`)
        })}
        onLoad={(params) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return props.onLoad(params);
        }}
        saved={saved}
        session={{
          key: props.collectionName,
          storage: sessionStorage
        }}
      />
    </Container>
  );
};

AdminItemList.defaultProps = {
  addButton: undefined,
  className: undefined,
  filters: undefined
};

export default withRouter(AdminItemList);
