import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormSigninMini from '../FormSigninMini';
import Button from '../Button';

import { user } from '../../store/user/selectors';
import { logoutUser } from '../../store/user/actions';

const UserPanelWrap = styled.div``;

const UserLogin = styled.h3``;

class UserPanel extends React.Component {
  render() {
    return this.props.user ? (
      <UserPanelWrap>
        <UserLogin>{this.props.user.login}</UserLogin>
        <Button type="button" onClick={this.handleLogout}>
          logout
        </Button>
      </UserPanelWrap>
    ) : (
      <UserPanelWrap>
        <FormSigninMini />
      </UserPanelWrap>
    );
  }
  renderLogged() {}

  handleLogout = () => {
    this.props.logoutUser();
  };
}

UserPanel.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  user: user(state)
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
