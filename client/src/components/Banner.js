// @flow

import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Container, Header, Message } from 'semantic-ui-react';
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
          { t('Banner.content') }
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
