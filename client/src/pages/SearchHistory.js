// @flow

import { CurrentFacetLabels, EmbeddedList } from '@performant-software/semantic-components';
import { useTimer } from '@performant-software/shared-components';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Container, Popup } from 'semantic-ui-react';
import _ from 'underscore';
import { getDateTimeView } from '../utils/Date';
import NavBar from '../components/NavBar';
import SearchHistoryService from '../services/SearchHistory';
import SearchLink from '../components/SearchLink';
import './SearchHistory.css';

const TOOLTIP_DELAY_MS  = 1500;

const SearchHistory = () => {
  const [items, setItems] = useState(_.sortBy(SearchHistoryService.getHistory(), 'created').reverse());
  const [copyItem, setCopyItem] = useState();

  const { t } = useTranslation();
  const { clearTimer, setTimer } = useTimer();

  /**
   * Clears the search history.
   *
   * @type {(function(): void)|*}
   */
  const onClear = useCallback(() => {
    // Clear the items on the state
    setItems([]);

    // Clear the items in session storage
    SearchHistoryService.clearHistory();
  }, []);

  /**
   * Copies the URL for the passed item and sets the selected item on the state.
   *
   * @type {(function(*): void)|*}
   */
  const onCopy = useCallback((item) => {
    const url = `${window.location.origin}/${item.url}`;
    navigator.clipboard.writeText(url);

    setCopyItem(item);

    clearTimer();
    setTimer(() => setCopyItem(null), TOOLTIP_DELAY_MS);
  }, []);

  return (
    <Container
      className='search-history'
      fluid
    >
      <NavBar />
      <Container>
        <EmbeddedList
          className='search-list'
          actions={[{
            as: Link,
            asProps: (item) => ({
              to: `/${item.url}`
            }),
            icon: 'arrow alternate circle right outline',
            name: 'link'
          }, {
            name: 'copy',
            render: (item) => (
              <Popup
                content={t('SearchHistory.messages.copy')}
                hoverable
                inverted
                on='click'
                onOpen={() => onCopy(item)}
                open={copyItem === item}
                trigger={(
                  <Button
                    basic
                    icon='copy outline'
                    size='small'
                  />
                )}
              />
            )
          }]}
          buttons={[{
            render: () => <SearchLink />
          }, {
            color: 'red',
            content: t('SearchHistory.buttons.clear'),
            icon: 'trash',
            onClick: onClear
          }]}
          columns={[{
            name: 'created',
            label: t('SearchHistory.columns.created'),
            resolve: (item) => getDateTimeView(item.created)
          }, {
            name: 'query',
            label: t('SearchHistory.columns.query')
          }, {
            name: 'items',
            label: t('SearchHistory.columns.facets'),
            render: (item) => (
              <CurrentFacetLabels
                items={_.map(item.items, (label) => ({ label }))}
              />
            )
          }]}
          defaultSort='created'
          defaultSortDirection='descending'
          items={items}
        />
      </Container>
    </Container>
  );
};

export default SearchHistory;
