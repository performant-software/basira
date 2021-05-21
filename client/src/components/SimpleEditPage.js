// @flow

import React, { Component } from 'react';
import { Element, Toaster } from 'react-components';
import { withRouter, RouterHistory } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Grid,
  Loader,
  Menu,
  Message,
  Ref,
  Sticky
} from 'semantic-ui-react';
import _ from 'underscore';

import i18n from '../i18n/i18n';

type Props = {
  children: Component<{}>,
  className?: string,
  errors: Array<string>,
  history: typeof RouterHistory,
  loading: boolean,
  onSave: (item: any) => Promise<any>,
  saving: boolean,
  showLoading?: boolean,
  stickyMenu?: boolean
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
  }

  /**
   * Selects the first tab.
   */
  componentDidMount() {
    this.onTabClick(_.first(Element.findByType(this.props.children, SimpleEditPage.Tab)));
  }

  /**
   * Displays the error toaster if new errors are added.
   *
   * @param prevProps
   */
  componentDidUpdate(prevProps: Props) {
    if (!_.isEmpty(this.props.errors) && prevProps.errors !== this.props.errors) {
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
    this.setState({ tab: tab.key });
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
        { this.renderLoading() }
        { this.renderSaving() }
        { this.renderToaster() }
        { this.renderPage() }
      </Container>
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
        verticalAlign='middle'
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
   *
   * @returns {null|*}
   */
  renderMenu(tabs) {
    if (!tabs || tabs.length === 1) {
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
      </Menu>
    );

    if (this.props.stickyMenu) {
      return (
        <Sticky
          ref={this.contextRef}
        >
          { menu }
        </Sticky>
      );
    }

    return menu;
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
        >
          <Grid.Column
            style={{
              flexGrow: '1'
            }}
          >
            { this.renderMenu(tabs) }
            { tab && tab.props.children }
          </Grid.Column>
          <Grid.Column
            className='five wide computer four wide large screen four wide widescreen column'
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
                  <div className='ui two buttons'>
                    <Button
                      content={i18n.t('Common.buttons.save')}
                      onClick={this.props.onSave.bind(this)}
                      primary
                    />
                    <Button
                      content={i18n.t('Common.buttons.cancel')}
                      inverted
                      onClick={() => this.props.history.goBack()}
                      primary
                    />
                  </div>
                </Card.Content>
              </Card>
            </Sticky>
          </Grid.Column>
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
        verticalAlign='middle'
      >
        <Loader
          content={i18n.t('Common.messages.saving')}
        />
      </Dimmer>
    );
  }

  /**
   * Renders the error toaster.
   *
   * @returns {null|*}
   */
  renderToaster() {
    if (!this.state.showToaster) {
      return null;
    }

    if (!(this.props.errors && this.props.errors.length)) {
      return null;
    }

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
}

const Header = (props) => props.children;
Header.displayName = 'Header';

const Tab = (props) => props.children;
Tab.displayName = 'Tab';

SimpleEditPage.Header = Header;
SimpleEditPage.Tab = Tab;

SimpleEditPage.defaultProps = {
  className: undefined,
  showLoading: true,
  stickyMenu: true
};

export default withRouter(SimpleEditPage);
