// @flow

import classNames from 'classnames';
import React, {
  useRef,
  useState,
  type Element,
  type Node
} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Loader,
  Menu,
  Ref,
  Segment,
  Sidebar
} from 'semantic-ui-react';
import ArtworkMenu from './ArtworkMenu';
import SearchLink from './SearchLink';
import useSidebar from '../hooks/Sidebar';
import './RecordPage.css';

type Props = {
  artworkId?: number,
  children: Node,
  className?: string,
  loading?: boolean,
  renderTitle?: (item: any) => Element<any> | string | null
};

const RecordPage = (props: Props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const menuBarRef = useRef(null);
  const { height: minHeight } = useSidebar(menuBarRef);

  return (
    <Container
      className={classNames('record-page', props.className)}
      fluid
    >
      <Ref
        innerRef={menuBarRef}
      >
        <Menu
          inverted
          size='large'
        >
          { props.loading && (
            <Menu.Item
              header
            >
              <Loader />
            </Menu.Item>
          )}
          { !props.loading && props.artworkId && (
            <Menu.Item>
              <Button
                basic
                icon='bars'
                inverted
                onClick={() => setSidebarVisible((visible) => !visible)}
              />
            </Menu.Item>
          )}
          { !props.loading && props.renderTitle && (
            <Menu.Item
              header
            >
              { props.renderTitle() }
            </Menu.Item>
          )}
          <Menu.Item
            position='right'
          >
            <SearchLink />
          </Menu.Item>
        </Menu>
      </Ref>
      <Sidebar.Pushable
        style={{
          minHeight
        }}
      >
        { props.artworkId && (
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
            <ArtworkMenu
              id={props.artworkId}
              renderRight={(item) => (
                <Button
                  as={Link}
                  basic
                  icon='arrow right'
                  inverted
                  to={item.path}
                />
              )}
            />
          </Sidebar>
        )}
        <Sidebar.Pusher>
          { !props.loading && props.children }
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
};

RecordPage.defaultProps = {
  artworkId: undefined,
  className: undefined,
  loading: undefined,
  renderTitle: undefined
};

type SectionProps = {
  children: Node,
  className?: string,
  title?: string
};

const Section = (props: SectionProps) => (
  <Container
    className={`section ${props.className ? props.className : ''}`}
  >
    { props.title && (
      <Header
        content={props.title}
        dividing
        size='large'
      />
    )}
    { props.children }
  </Container>
);

Section.defaultProps = {
  className: undefined,
  title: undefined
};

RecordPage.Section = Section;

export default RecordPage;
