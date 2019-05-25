import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import constants from '../../constants';

const show = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const NoteWrap = styled.div`
  position: relative;
  padding: 10px;

  background-color: #fff;
  background-color: ${props => props.backgroundColor};
  border-radius: 5px;
  border: 2px solid ${constants.styles.PRIMARY_COLOR};

  animation: ${show} 0.5s ease;
`;

const DeleteButton = styled.button`
  position: absolute;
  padding: 0px 5px;
  right: 2px;
  top: 2px;

  font-size: 20px;
  line-height: 1;
  background-color: #fff;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  opacity: 0.5;
  transition: 0.2s;

  ${NoteWrap}:hover & {
    opacity: 1;
  }
`;

const NoteTitle = styled.h3``;

const NoteText = styled.p``;

class Note extends React.Component {
  render() {
    return (
      <NoteWrap backgroundColor={this.props.color}>
        <DeleteButton type="button" onClick={this.handleDeleteButtonClick}>
          x
        </DeleteButton>
        <NoteTitle>{this.props.title}</NoteTitle>
        <NoteText>{this.props.text}</NoteText>
      </NoteWrap>
    );
  }

  handleDeleteButtonClick = noteId => {
    this.props.deleteNote(this.props._id);
  };
}

Note.propTypes = {
  notesList: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    color: PropTypes.string
  }),
  deleteNote: PropTypes.func.isRequired
};

export default Note;
