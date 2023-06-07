// @flow

import React, { Component, createRef } from 'react';
import { Toaster } from '@performant-software/semantic-components';
import { Element } from '@performant-software/shared-components';
import { withRouter, RouterHistory } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Grid,
  Header,
  Loader,
  Menu,
  Message,
  Ref,
  Sticky
} from 'semantic-ui-react';
import _ from 'underscore';
import i18n from '../i18n/i18n';
import './SimpleEditPage.css';

import type { Translateable } from '../types/Translateable';

type Props = Translateable & {
  children: Component<{}>,
  className?: string,
  errors: Array<string>,
  history: typeof RouterHistory,
  loading: boolean,
  location: {
    state: {
      saved: boolean,
      tab?: string
    }
  },
  onSave: (item: any) => Promise<any>,
  onTabClick?: (tab: string) => void,
  saving: boolean,
  showLoading?: boolean,
  stickyMenu?: boolean,
  type?: string
};

type State = {
  showToaster: boolean,
  tab: ?string
};

class SimpleEditPage extends Component<Props, State> {
  static defaultProps: any;
  static Header: (p: any) => any;
  static Tab: (p: any) => any;

  contextRef: any;

  /**
   * Constructs a new SimpleEditPage component.
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      showToaster: false,
      tab: null
    };

    this.contextRef = createRef();
  }

  /**
   * Sets up the component on mount.
   */
  componentDidMount() {
    const { state = {} } = this.props.location;
    const { saved, tab } = state;

    const tabs = Element.findByType(this.props.children, SimpleEditPage.Tab);

    // If a tab if provided by the router state, set the tab. Otherwise default to the first tab.
    if (tab) {
      this.onTabClick(_.findWhere(tabs, { key: tab }));
    } else {
      this.onTabClick(_.first(tabs));
    }

    // If the record has been saved, display the toaster.
    if (saved) {
      this.setState({ showToaster: true });
    }
  }

  /**
   * Returns the space-delimited class name(s).
   *
   * @returns {string}
   */
  getClassName() {
    const classNames = ['simple-edit-page'];

    if (this.props.className) {
      classNames.push(this.props.className);
    }

    return classNames.join(' ');
  }

  /**
   * Sets the current tab on the state.
   *
   * @param tab
   */
  onTabClick(tab) {
    this.setState({ tab: tab.key }, () => {
      if (this.props.onTabClick) {
        this.props.onTabClick(tab.key);
      }
    });
  }

  /**
   * Renders the SimpleEditPage component.
   *
   * @returns {*}
   */
  render() {
    return (
      <Container
        as={Form}
        className={this.getClassName()}
        fluid
        noValidate
      >
        { this.renderToaster() }
        { this.renderLoading() }
        { this.renderSaving() }
        { this.renderPage() }
      </Container>
    );
  }

  renderButtons() {
    return (
      <div
        className='ui two buttons'
      >
        <Button
          content={i18n.t('Common.buttons.save')}
          onClick={() => this.setState({ showToaster: true }, this.props.onSave.bind(this))}
          primary
        />
        <Button
          content={i18n.t('Common.buttons.cancel')}
          inverted
          onClick={() => this.props.history.goBack()}
          primary
        />
      </div>
    );
  }

  /**
   * Renders the loading indicator.
   *
   * @returns {null|*}
   */
  renderLoading() {
    if (!(this.props.showLoading && this.props.loading)) {
      return null;
    }

    return (
      <Dimmer
        active={this.props.loading}
        inverted
        page
      >
        <Loader
          content={i18n.t('Common.messages.loading')}
        />
      </Dimmer>
    );
  }

  /**
   * Renders the menu for the passed collection of tabs.
   *
   * @param tabs
   * @param buttons
   *
   * @returns {JSX.Element|null}
   */
  renderMenu(tabs, buttons = false) {
    if (!buttons && (!tabs || tabs.length === 1)) {
      return null;
    }

    const menu = (
      <Menu
        className='tabs-menu'
        pointing
        secondary
      >
        { _.map(tabs, (item) => (
          <Menu.Item
            active={item.key === this.state.tab}
            key={item.key}
            name={item.props.name}
            onClick={() => {
              this.onTabClick(item);
            }}
          />
        ))}
        { buttons && (
          <Menu.Item
            position='right'
          >
            { this.renderButtons() }
          </Menu.Item>
        )}
      </Menu>
    );

    if (this.props.stickyMenu) {
      return (
        <Sticky
          context={this.contextRef}
          offset={20}
        >
          { menu }
        </Sticky>
      );
    }

    return menu;
  }

  /**
   * Renders the "Add New <type>" header.
   *
   * @returns {JSX.Element|null}
   */
  renderNew() {
    if (!this.props.type) {
      return null;
    }

    return (
      <Header
        content={i18n.t('SimpleEditPage.labels.add', { type: this.props.type })}
        size='large'
      />
    );
  }

  /**
   * Renders the current page.
   *
   * @returns {null|*}
   */
  renderPage() {
    if (this.props.showLoading && this.props.loading) {
      return null;
    }

    const header = _.first(Element.findByType(this.props.children, SimpleEditPage.Header));
    const tabs = Element.findByType(this.props.children, SimpleEditPage.Tab);
    const tab = _.find(tabs, (t) => t.key === this.state.tab);

    return (
      <Ref
        innerRef={this.contextRef}
      >
        <Grid
          columns={2}
          style={{
            marginLeft: '50px',
            marginRight: header ? undefined : '50px'
          }}
        >
          <Grid.Column
            style={{
              flexGrow: '1'
            }}
          >
            { this.renderNew() }
            { this.renderMenu(tabs, !header) }
            { tab && tab.props.children }
          </Grid.Column>
          { header && (
            <Grid.Column
              className='five wide computer four wide large screen four wide widescreen column'
              style={{
                marginTop: '0.5em',
                marginBottom: '0.5em'
              }}
            >
              <Sticky
                context={this.contextRef}
                offset={20}
              >
                <Card>
                  { header && header.props && header.props.children }
                  <Card.Content
                    extra
                  >
                    { this.renderButtons() }
                  </Card.Content>
                </Card>
              </Sticky>
            </Grid.Column>
          )}
        </Grid>
      </Ref>
    );
  }

  /**
   * Renders the saving indicator.
   *
   * @returns {null|*}
   */
  renderSaving() {
    if (!this.props.saving) {
      return null;
    }

    return (
      <Dimmer
        active={this.props.saving}
        inverted
      >
        <Loader
          content={i18n.t('Common.messages.saving')}
        />
      </Dimmer>
    );
  }

  /**
   * Renders the success/error toaster.
   *
   * @returns {JSX.Element|null}
   */
  renderToaster() {
    if (!this.state.showToaster || this.props.saving) {
      return null;
    }

    if (this.props.errors && this.props.errors.length) {
      return (
        <Toaster
          onDismiss={() => this.setState({ showToaster: false })}
          timeout={0}
          type={Toaster.MessageTypes.negative}
        >
          <Message.Header
            content={i18n.t('Common.errors.header')}
          />
          <Message.List
            items={this.props.errors}
          />
        </Toaster>
      );
    }

    return (
      <Toaster
        onDismiss={() => this.setState({ showToaster: false })}
        timeout={3000}
        type={Toaster.MessageTypes.positive}
      >
        <Message.Header
          content={i18n.t('Common.messages.saved.header')}
        />
        <Message.Content
          content={i18n.t('Common.messages.saved.content')}
        />
      </Toaster>

    );
  }
}

const HeaderComponent = (props) => props.children;
HeaderComponent.displayName = 'Header';

const Tab = (props) => props.children;
Tab.displayName = 'Tab';

SimpleEditPage.Header = HeaderComponent;
SimpleEditPage.Tab = Tab;

SimpleEditPage.defaultProps = {
  className: undefined,
  showLoading: true,
  stickyMenu: true,
  type: undefined
};

export default withRouter(SimpleEditPage);
