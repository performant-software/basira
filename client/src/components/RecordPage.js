// @flow

import { LazyImage } from '@performant-software/semantic-components';
import classNames from 'classnames';
import React, {
  useRef,
  useState,
  type Element,
  type Node
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Header as SemanticHeader,
  Loader,
  Menu,
  Ref,
  Segment,
  Sidebar
} from 'semantic-ui-react';
import ArtworkMenu from './ArtworkMenu';
import type { Attachment } from '../types/Attachment';
import ImageInfo from './ImageInfo';
import PageFooter from './PageFooter';
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
  const location = useLocation();

  const menuBarRef = useRef(null);
  const { height: minHeight } = useSidebar(menuBarRef);

  const { state: { fromSearch } = {} } = location;

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
          { fromSearch && (
            <Menu.Item
              position='right'
            >
              <SearchLink
                inverted
              />
            </Menu.Item>
          )}
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
          <main>
            { !props.loading && props.children }
          </main>
          { !props.loading && <PageFooter /> }
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
      <SemanticHeader
        content={props.title}
        dividing
        size='small'
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

type ImageProps = {
  item: Attachment
};

const Image = (props: ImageProps) => (
  <div
    className='record-page-image'
  >
    <LazyImage
      src={props.item.file_url}
    />
  </div>
);

RecordPage.Image = Image;

type HeaderProps = {
  children: Node,
  image: Attachment
};

const Header = (props: HeaderProps) => (
  <Grid
    columns={2}
  >
    { props.image && (
      <Grid.Column
        width={4}
      >
        <RecordPage.Image
          item={props.image}
        />
      </Grid.Column>
    )}
    <Grid.Column
      width={12}
    >
      { props.children }
    </Grid.Column>
    <Grid.Column
      width={16}
    >
      <ImageInfo
        item={props.image}
      />
    </Grid.Column>
  </Grid>
);

RecordPage.Header = Header;

export default RecordPage;
