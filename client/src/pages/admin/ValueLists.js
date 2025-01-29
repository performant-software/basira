// @flow

import type { EditContainerProps } from '@performant-software/shared-components/types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Header, Tab } from 'semantic-ui-react';
import _ from 'underscore';
import ValueListsTable from '../../components/ValueListsTable';
import withMenuBar from '../../hooks/MenuBar';
import ValueListsService from '../../services/ValueLists';
import './ValueLists.css';

import type { ValueList as ValueListType } from '../../types/ValueList';
import type { Translateable } from '../../types/Translateable';

type Props = EditContainerProps & Translateable & {
  item: ValueListType
};

const ValueLists = (props: Props) => {
  const [objectsList, setObjectsList] = useState([]);

  /**
   * Memo-izes the tab panes.
   *
   * @type {{menuItem: *, render: function(): *}[]}
   */
  const panes = useMemo(() => objectsList.map((objectName) => ({
    menuItem: objectName,
    render: () => (
      <Tab.Pane
        attached={false}
      >
        <ValueListsTable
          objectName={objectName}
        />
      </Tab.Pane>
    )
  })), [objectsList]);

  /**
   * Sets the tab list on the state.
   */
  useEffect(() => {
    ValueListsService
      .getObjectsList()
      .then((response) => setObjectsList(response.data.objects))
  }, []);

  return (
    <Container
      className='value-lists'
    >
      <Header
        as='h2'
      >
        { props.t('Admin.menu.valueLists') }
      </Header>
      <Tab
        className='tab'
        menu={{
          secondary: true
        }}
        panes={panes}
      />
    </Container>
  );
};
export default withMenuBar(ValueLists);
