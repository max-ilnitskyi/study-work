import constats from '../../constants';

// import store from '../index';
// import { usersList } from './selectors';

const { SET_NOTES } = constats.actionTypes;

export const setNotes = notes => ({
  type: SET_NOTES,
  payload: notes
});

let delay = 500;
export const fetchNotes = () => {
  return dispatch => {
    fetch(`/api/notes`, {
      // headers: {
      //   Accept: 'application/json'
      // }
    })
      .then(response => {
        console.log('---response fetchNotes1: ', response); //temp
        return response.json();
      })
      .then(data => {
        // TODO: chek data for success
        // if (!data.success) return Promise.reject(new Error(data.message));

        // TODO: wrap respons with meta-data, move notes to data.notes
        dispatch(setNotes(data));

        console.log('---response fetchNotes2: ', data); //temp

        delay = 500;
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production')
          console.log('---error fetchNotes: ', err);

        if (delay !== null) {
          setTimeout(() => {
            dispatch(fetchNotes());
          }, delay);
          delay = delay * 2;
        }
      });
  };
};

let delay2 = 500;
export const postNote = note => {
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
        dispatch(fetchNotes());
        delay2 = 500;
      })
      // .then(data => {
      //   // TODO: chek data for success
      //   // if (!data.success) return Promise.reject(new Error(data.message));
      //
      //   // TODO: wrap respons with meta-data, move notes to data.notes
      //   dispatch(setNotes(data));
      //
      //   console.log('---response 2: ', data); //temp
      //
      //   delay2 = 500;
      // })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production')
          console.log('---error postNote: ', err);

        if (delay2 !== null) {
          setTimeout(() => {
            dispatch(postNote());
          }, delay2);
          delay2 = delay2 * 2;
        }
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
        dispatch(fetchNotes());
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production')
          console.log('---error deleteNote: ', err);
      });
  };
};
