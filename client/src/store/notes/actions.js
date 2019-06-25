import constats from '../../constants';
import fetchJSON from '../../utils/fetchJSON';

const { SET_NOTES } = constats.actionTypes;

export const setNotes = notes => ({
  type: SET_NOTES,
  payload: notes
});

export const fetchNotes = (onSuccess, onError) => {
  return dispatch => {
    fetchJSON.get(`/api/notes`, data => {
      if (!data.ok) {
        if (onError) onError(data.message);
        return;
      }

      if (onSuccess) onSuccess();
      dispatch(setNotes(data.notes));
    });
  };
};

export const postNote = (note, onSuccess, onError) => {
  return dispatch => {
    fetchJSON.post(`/api/notes`, note, data => {
      if (!data.ok) {
        if (onError) onError(data.message);
        return;
      }

      if (onSuccess) onSuccess();
      dispatch(fetchNotes());
    });
  };
};

export const deleteNote = (noteId, onSuccess, onError) => {
  return dispatch => {
    fetchJSON.delete(`/api/notes/${noteId}`, data => {
      if (!data.ok) {
        if (onError) onError(data.message);
        return;
      }

      if (onSuccess) onSuccess();
      dispatch(fetchNotes());
    });
  };
};
