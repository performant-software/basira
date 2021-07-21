// @flow

import React, {
  useEffect,
  useRef,
  useState,
  type ComponentType
} from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  Icon,
  Menu,
  Ref,
  Segment,
  Sidebar
} from 'semantic-ui-react';
import AccordionMenu from '../components/AccordionMenu';
import Authentication from '../services/Authentication';
import Session from '../services/Session';
import './MenuBar.css';

const ARTWORKS_REGEX = '/admin/(artworks|physical_components|visual_contexts|documents)';

const withMenuBar = (WrappedComponent: ComponentType<any>) => withTranslation()(withRouter((props) => {
  const menuBarRef = useRef();

  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const menuBarInstance = menuBarRef.current;

    if (menuBarInstance) {
      const { clientHeight } = menuBarInstance;
      setSidebarHeight(`calc(100vh - ${clientHeight}px`);
    }
  }, []);

  return (
    <div
      className='menu-bar'
    >
      <Ref
        innerRef={menuBarRef}
      >
        <Segment
          inverted
        >
          <Menu
            inverted
            secondary
          >
            <Menu.Item>
              { props.getArtworkId && (
                <Button
                  basic
                  icon='bars'
                  inverted
                  onClick={() => setSidebarVisible((visible) => !visible)}
                />
              )}
            </Menu.Item>
            <Menu.Item
              header
            >
              <Icon
                name='paint brush'
              />
              <Menu.Header
                content={props.t('Common.title')}
              />
            </Menu.Item>
            <Menu.Menu
              style={{
                paddingLeft: '4em'
              }}
            >
              <Menu.Item
                active={!!props.location.pathname.match(ARTWORKS_REGEX)}
                as={Link}
                content={props.t('Admin.menu.artworks')}
                to='/admin/artworks'
              />
              <Menu.Item
                active={!!props.location.pathname.match('/admin/people')}
                as={Link}
                content={props.t('Admin.menu.people')}
                to='/admin/people'
              />
              <Menu.Item
                active={!!props.location.pathname.match('/admin/places')}
                as={Link}
                content={props.t('Admin.menu.places')}
                to='/admin/places'
              />
              <Menu.Item
                active={!!props.location.pathname.match('/admin/value_lists')}
                as={Link}
                content={props.t('Admin.menu.valueLists')}
                to='/admin/value_lists'
              />
              <Menu.Item
                active={!!props.location.pathname.match('/admin/users')}
                as={Link}
                content={props.t('Admin.menu.users')}
                to='/admin/users'
              />
            </Menu.Menu>
            <Menu.Item
              position='right'
            >
              <div
                className='greeting'
              >
                { props.t('Admin.labels.greeting', { name: Session.getName() })}
              </div>
              <Button
                basic
                content={props.t('Admin.buttons.logout')}
                icon='logout'
                inverted
                onClick={() => (
                  Authentication
                    .logout()
                    .then(() => {
                      Session.destroy();
                      props.history.push('/');
                    })
                )}
              />
            </Menu.Item>
          </Menu>
        </Segment>
      </Ref>
      <Sidebar.Pushable
        style={{
          minHeight: sidebarHeight
        }}
      >
        { props.getArtworkId && (
          <Sidebar
            as={Segment}
            animation='overlay'
            inverted
            onHide={() => setSidebarVisible(false)}
            visible={sidebarVisible}
            width='very wide'
            style={{
              width: '50%'
            }}
          >
            <AccordionMenu
              id={props.getArtworkId(props.item)}
            />
          </Sidebar>
        )}
        <Sidebar.Pusher
          style={{
            marginTop: '1em',
            marginBottom: '1em'
          }}
        >
          <WrappedComponent
            {...props}
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>

    </div>
  );
}));

export default withMenuBar;
