// @flow

import { ListTable } from '@performant-software/semantic-components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';

type Props = {
  className?: string,
  collectionName: string,
  columns: Array<any>,
  onLoad: (params: any) => Promise<any>
};

const ListPage = (props: Props) => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Container
      className='list-page'
      fluid
    >
      <NavBar />
      <Container>
        <ListTable
          actions={[{
            as: Link,
            asProps: (item) => ({
              to: {
                pathname: `${location.pathname}/${item.id}`,
                state: {
                  fromList: true,
                }
              }
            }),
            name: 'navigate',
            icon: 'arrow alternate circle right outline',
            popup: {
              content: t('ListPage.actions.navigate.content'),
              title: t('ListPage.actions.navigate.title')
            }
          }]}
          className={props.className}
          collectionName={props.collectionName}
          columns={props.columns}
          onLoad={props.onLoad}
          searchable
        />
      </Container>
    </Container>
  );
};

export default ListPage;
