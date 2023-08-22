// @flow

import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Container,
  Header,
  Icon,
  Message
} from 'semantic-ui-react';
import './Banner.css';

const BANNER_KEY = 'VWspR3ltX8_basira_banner_status';

const Status = {
  pending: 0,
  visible: 1,
  dismissed: 2
};

const Banner = () => {
  const [status, setStatus] = useState(Status.pending);

  const { t } = useTranslation();

  /**
   * Sets the initial status value based on session storage.
   */
  useEffect(() => {
    const storageValue = parseInt(sessionStorage.getItem(BANNER_KEY) || Status.visible.toString(), 10);
    setStatus(storageValue);
  }, []);

  /**
   * Sets the session storage value when the status changes.
   */
  useEffect(() => {
    sessionStorage.setItem(BANNER_KEY, status.toString());
  }, [status]);

  return (
    <Container
      className='banner'
    >
      <Message
        hidden={status !== Status.visible}
        onDismiss={() => setStatus(Status.dismissed)}
      >
        <Message.Header
          as={Header}
        >
          { t('Banner.title') }
          <Header.Subheader>
            { t('Banner.subtitle') }
          </Header.Subheader>
        </Message.Header>
        <Message.Content>
          <Trans
            i18nKey='Banner.content'
          >
            {/* eslint-disable-next-line max-len */}
            BASIRA is an open-access database of representations of books and other documents in art. Begin your search by choosing facets from the list on the left, or enter any combination of keywords. Click on any result to view more details, and use the
            <Icon
              bordered
              inverted
              name='bars'
            />
            menu in the upper-left corner of any detail page to explore more aspects of that artwork.
          </Trans>
        </Message.Content>
        <Message.Content>
          <Trans
            i18nKey='Banner.footer'
          >
            Learn more at the BASIRA Project homepage:
            <a
              href='https://basiraproject.org/'
              target='_blank'
              rel='noreferrer'
            >
              https://basiraproject.org/
            </a>
          </Trans>
        </Message.Content>
      </Message>
    </Container>
  );
};

export default Banner;
