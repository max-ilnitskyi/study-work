import React from 'react';
import styled from 'styled-components';

const NoteWrap = styled.div``;

const NoteTitle = styled.h3``;

const NoteText = styled.div``;

class Note extends React.Component {
  render() {
    return (
      <NoteWrap>
        <NoteTitle>{this.props.title}</NoteTitle>
        <NoteText>{this.props.text}</NoteText>
      </NoteWrap>
    );
  }
}

export default Note;
