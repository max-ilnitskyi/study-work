import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import FormNewNote from '../FormNewNote';
import Note from './Note';

import { notesList } from '../../store/notes/selectors';
import { fetchNotes, deleteNote } from '../../store/notes/actions';
import { messagesActions } from '../Messages';

const NotesList = styled.div`
  ${'' /* here must be styles */}
`;

const NotesListItem = styled.div`
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
`;

const NewNoteFormWrap = styled.div`
  margin-top: 30px;
`;

class PageContentNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notesWaitingDeleteResponse: {}
    };
  }

  render() {
    return (
      <PageContentWrap>
        <Helmet>
          <title>Notes - Study work</title>
        </Helmet>
        <NotesList>
          {this.props.notesList.map(note => (
            <NotesListItem key={note._id}>
              <Note
                {...note}
                deleteNote={this.deleteNote}
                isWaitingDeleteResponse={
                  this.state.notesWaitingDeleteResponse[note._id]
                }
              />
            </NotesListItem>
          ))}
        </NotesList>
        <NewNoteFormWrap>
          <FormNewNote />
        </NewNoteFormWrap>
      </PageContentWrap>
    );
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  deleteNote = noteId => {
    this.setState({
      notesWaitingDeleteResponse: {
        ...this.state.notesWaitingDeleteResponse,
        [noteId]: true
      }
    });

    this.props.deleteNote(
      noteId,
      () => {
        messagesActions.showSuccess('You have successfully deleted the note!');
        this.setState({
          notesWaitingDeleteResponse: {
            ...this.state.notesWaitingDeleteResponse,
            [noteId]: false
          }
        });
      },
      () => {
        messagesActions.showError('The note has not been deleted');
        this.setState({
          notesWaitingDeleteResponse: {
            ...this.state.notesWaitingDeleteResponse,
            [noteId]: false
          }
        });
      }
    );
  };
}

PageContentNotes.propTypes = {
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
)(PageContentNotes);
