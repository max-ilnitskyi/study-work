import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import Loading from '../Loading';

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
  border-radius: 5px;
  border: 2px solid ${constants.styles.PRIMARY_COLOR};
   ${props => props.color && `border: 2px solid ${props.color};`}

  animation: ${show} 0.5s ease;
`;

const DeleteButton = styled.button`
  position: absolute;
  padding: 3px 5px;
  right: 5px;
  top: 5px;

  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  color: #000;
  background-color: #fff;
  background-color: rgba(255, 0, 0, 0.3);
  border-radius: 3px;
  cursor: pointer;
  border: none;
  opacity: 0.3;
  box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.1);

  transition: 0.2s;

  ${NoteWrap}:hover & {
    opacity: 1;
  }

  &:disabled {
    color: #333;
    background-color: rgba(100, 100, 100, 0.3);
    cursor: default;
  }
`;

const NoteTitle = styled.h3`
  ${'' /* here must be styles */}
`;

const NoteText = styled.p`
  ${'' /* here must be styles */}
`;

const LoadingWrap = styled.div`
  display: inline-block;
  width: 16px;
`;

class Note extends React.Component {
  render() {
    return (
      <NoteWrap color={this.props.color}>
        <DeleteButton
          disabled={this.props.isWaitingDeleteResponse}
          type="button"
          onClick={this.handleDeleteButtonClick}
        >
          delete
          {this.props.isWaitingDeleteResponse && (
            <LoadingWrap>
              <Loading />
            </LoadingWrap>
          )}
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
  deleteNote: PropTypes.func.isRequired,
  isWaitingDeleteResponse: PropTypes.bool
};

export default Note;
