// @flow

import React, { type Element, type Node } from 'react';
import {
  Container,
  Header,
  Loader,
  Menu
} from 'semantic-ui-react';
import './RecordPage.css';

type Props = {
  children: Node,
  className?: string,
  loading?: boolean,
  renderTitle?: (item: any) => Element<any> | string | null
};

const RecordPage = (props: Props) => (
  <Container
    className={`record-page ${props.className ? props.className : ''}`}
    fluid
  >
    <Menu
      inverted
      size='large'
      widths={16}
    >
      { props.loading && (
        <Menu.Item
          header
        >
          <Loader />
        </Menu.Item>
      )}
      { !props.loading && props.renderTitle && (
        <Menu.Item
          header
        >
          { props.renderTitle() }
        </Menu.Item>
      )}
    </Menu>
    { !props.loading && props.children }
  </Container>
);

RecordPage.defaultProps = {
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
