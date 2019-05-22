import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { notesList } from '../../store/notes/selectors';
import { fetchNotes } from '../../store/notes/actions';

import Note from './Note';

const NotesPageContentWrap = styled.div``;

const NotesList = styled.div``;

const NotesListItem = styled.div`
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
`;

// mocks
// const notesList = [
//   {
//     _id: '5cd21c3464760e1fa476d6c6',
//     title: 'Hello',
//     text: 'Worlddddd',
//     color: 'red',
//     createdAt: '2019-05-08T00:00:52.734Z',
//     __v: 0
//   },
//   {
//     _id: '5ce1b9f90293e30ce0fa64b9',
//     title: 'tttttttttttttt',
//     text: 'tttttttttttttt',
//     color: 'ttttttttttttt',
//     createdAt: '2019-05-19T20:18:01.511Z',
//     __v: 0
//   },
//   {
//     _id: '5ce1bb1887171130ac6ef1e2',
//     title: 'first post',
//     text: 'This is my first post',
//     color: 'red',
//     createdAt: '2019-05-19T20:22:48.006Z',
//     __v: 0
//   },
//   {
//     _id: '5ce1bb3287171130ac6ef1e3',
//     title: 'second post',
//     text: 'This is my second post',
//     color: 'red',
//     createdAt: '2019-05-19T20:23:14.644Z',
//     __v: 0
//   }
// ];

class NotesPageContent extends React.Component {
  render() {
    return (
      <NotesPageContentWrap>
        <NotesList>
          {this.props.notesList.map(({ title, text, _id }) => (
            <NotesListItem key={_id}>
              <Note title={title} text={text} />
            </NotesListItem>
          ))}
        </NotesList>
      </NotesPageContentWrap>
    );
  }

  componentDidMount() {
    this.props.fetchNotes();
  }
}

NotesPageContent.propTypes = {
  notesList: PropTypes.array.isRequired,
  fetchNotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notesList: notesList(state)
});

const mapDispatchToProps = {
  fetchNotes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesPageContent);
