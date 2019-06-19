import constats from '../../constants';
import fetchJSON from '../../utils/fetchJSON';

const { SET_NOTES } = constats.actionTypes;

export const setNotes = notes => ({
  type: SET_NOTES,
  payload: notes
});

export const fetchNotes = (onSuccess, onError) => {
  return dispatch => {
    fetchJSON.get(
      `/api/notes`,
      notes => {
        if (typeof onSuccess === 'function') onSuccess(notes);
        dispatch(setNotes(notes));
      },
      err => {
        if (typeof onError === 'function') onError(err);
      }
    );
  };
};

export const postNote = (note, onSuccess, onError) => {
  return dispatch => {
    fetchJSON.post(
      `/api/notes`,
      note,
      data => {
        if (typeof onSuccess === 'function') onSuccess(data);
        dispatch(fetchNotes());
      },
      err => {
        if (typeof onError === 'function') onError(err);
      }
    );
  };
};

export const deleteNote = (noteId, onSuccess, onError) => {
  return dispatch => {
    fetchJSON.delete(
      `/api/notes/${noteId}`,
      data => {
        if (typeof onSuccess === 'function') onSuccess(data);
        dispatch(fetchNotes());
      },
      err => {
        if (typeof onError === 'function') onError(err);
      }
    );
  };
};
