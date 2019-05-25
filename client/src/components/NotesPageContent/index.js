import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import NewNoteForm from '../NewNoteForm';

import { notesList } from '../../store/notes/selectors';
import { fetchNotes, deleteNote } from '../../store/notes/actions';

import Note from './Note';

const NotesList = styled.div``;

const NotesListItem = styled.div`
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
`;

const NewNoteFormWrap = styled.div`
  margin-top: 30px;
`;

class NotesPageContent extends React.Component {
  render() {
    return (
      <PageContentWrap>
        <Helmet>
          <title>Notes - Study work</title>
        </Helmet>
        <NotesList>
          {this.props.notesList.map(note => (
            <NotesListItem key={note._id}>
              <Note {...note} deleteNote={this.deleteNote} />
            </NotesListItem>
          ))}
        </NotesList>
        <NewNoteFormWrap>
          <NewNoteForm />
        </NewNoteFormWrap>
      </PageContentWrap>
    );
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  deleteNote = noteId => {
    this.props.deleteNote(noteId);
  };
}

NotesPageContent.propTypes = {
  notesList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      color: PropTypes.string
    })
  ),
  fetchNotes: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notesList: notesList(state)
});

const mapDispatchToProps = {
  fetchNotes,
  deleteNote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesPageContent);
