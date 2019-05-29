import constats from '../../constants';

// import store from '../index';
// import { usersList } from './selectors';

const { SET_NOTES } = constats.actionTypes;

export const setNotes = notes => ({
  type: SET_NOTES,
  payload: notes
});

export const fetchNotes = () => {
  return dispatch => {
    fetch(`/api/notes`, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        console.log('---response fetchNotes1: ', response); //temp
        if (!response.ok) {
          throw new Error(`Response is not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        dispatch(setNotes(data));
        console.log('---response fetchNotes2: ', data); //temp
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production')
          console.log('---error fetchNotes: ', err);
      });
  };
};

export const postNote = (note, successCallback) => {
  return dispatch => {
    fetch(`/api/notes`, {
      method: 'post',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('---response postNote: ', response); //temp
        if (!response.ok) {
          throw new Error(`Response is not ok, status: ${response.status}`);
        }

        if (typeof successCallback === 'function') successCallback();
        dispatch(fetchNotes());
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production')
          console.log('---error postNote: ', err);
      });
  };
};

export const deleteNote = noteId => {
  return dispatch => {
    fetch(`/api/notes/${noteId}`, {
      method: 'delete'
    })
      .then(response => {
        console.log('---response deleteNote: ', response); //temp
        if (!response.ok) {
          throw new Error(`Response is not ok, status: ${response.status}`);
        }
        dispatch(fetchNotes());
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production')
          console.log('---error deleteNote: ', err);
      });
  };
};
