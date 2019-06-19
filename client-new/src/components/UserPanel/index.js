import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormSignin from '../FormSignin';

import { user } from '../../store/user/selectors';
// import { fetchNotes, deleteNote } from '../../store/notes/actions';

const UserPanelWrap = styled.div``;

class UserPanel extends React.Component {
  render() {
    return (
      <UserPanelWrap>
        <FormSignin />
      </UserPanelWrap>
    );
  }
}

UserPanel.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  user: user(state)
});

const mapDispatchToProps = {
  // fetchNotes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
