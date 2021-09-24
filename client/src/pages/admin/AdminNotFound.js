// @flow

import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import withMenuBar from '../../hooks/MenuBar';
import './AdminNotFound.css';

const AdminNotFound = () => {
  const history = useHistory();
  return (
    <Container
      className='admin-not-found'
    >
      <h2>Page not found</h2>
      <p>
        Sorry, the page you attempted to reach could not be found.
      </p>
      <p>
        <button
          type='button'
          className='link-button'
          onClick={() => history.go(-2)}
        >
          Click here to return to the previous page.
        </button>
      </p>
    </Container>
  );
};

export default withRouter(withMenuBar(AdminNotFound));
