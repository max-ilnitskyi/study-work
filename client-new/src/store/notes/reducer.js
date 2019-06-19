import constats from '../../constants';

const { SET_NOTES } = constats.actionTypes;

const defaultStore = {
  notesList: []
};

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case SET_NOTES:
      return { ...store, notesList: action.payload };

    default:
      return store;
  }
};

export default reducer;
