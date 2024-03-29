// @flow

import React, { useCallback, useEffect, useState } from 'react';
import { LoginModal } from '@performant-software/semantic-components';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment
} from 'semantic-ui-react';
import _ from 'underscore';
import Authentication from '../services/Authentication';
import FooterLinks from '../components/FooterLinks';
import HomeService from '../services/Home';
import type { Routeable } from '../types/Routeable';
import Session from '../services/Session';
import type { Translateable } from '../types/Translateable';
import './Home.css';

type Props = Routeable & Translateable & {
  images: number
};

const Home = (props: Props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginFailed, setLoginFailed] = useState(false);
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    HomeService
      .fetchAll()
      .then(({ data }) => {
        setImages(_.map(data.homes, (item) => item.primary_attachment.thumbnail_url));
      });
  }, [props.images]);

  /**
   * Returns the class name for the passed image.
   *
   * @type {function(*=): string}
   */
  const getClassName = useCallback((image) => {
    let className = 'hidden-image';

    if (_.contains(loadedImages, image)) {
      className = 'fade-in-image';
    }

    return className;
  }, [loadedImages]);

  /**
   * Tracks that the passed image has been loaded.
   *
   * @param image
   */
  const onImageLoad = (image) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, image]);
  };

  return (
    <div
      className='home'
    >
      <Container
        text
      >
        <Segment
          basic
        >
          <div
            className='image-container'
          >
            { _.map(images, (image, index) => (
              <Image
                className={getClassName(image)}
                key={index}
                onError={() => onImageLoad(image)}
                onLoad={() => onImageLoad(image)}
                src={image}
              />
            ))}
          </div>
          <Header
            content={props.t('Common.title')}
            size='huge'
            subheader={props.t('Home.subtitle')}
          />
          <p className='description'>
            {props.t('Home.description')}
          </p>
          <Button
            onClick={() => setModal(true)}
            primary
            size='big'
          >
            { props.t('Home.buttons.login') }
            <Icon
              name='arrow alternate circle right outline'
            />
          </Button>
        </Segment>
        <FooterLinks
          fixed='bottom'
        />
      </Container>
      <LoginModal
        disabled={!(username && password)}
        loginFailed={loginFailed}
        onClose={() => {
          setLoginFailed(false);
          setModal(false);
        }}
        onLogin={() => (
          Authentication
            .login(username, password)
            .then((response) => {
              Session.create(response);
              props.history.push('/admin');
            })
            .catch(() => {
              setLoginFailed(true);
              Session.destroy();
            })
        )}
        onPasswordChange={(e, { value }) => setPassword(value)}
        onUsernameChange={(e, { value }) => setUsername(value)}
        open={modal}
      />
    </div>
  );
};

export default withTranslation()(withRouter(Home));
