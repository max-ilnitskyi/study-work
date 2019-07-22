import constats from '../../constants';

const {
  SET_MY_STORIES,
  SET_ALL_STORIES,
  SET_MY_STORIES_FETCH_STATE,
  SET_ALL_STORIES_FETCH_STATE
} = constats.actionTypes;

const defaultStore = {
  myStoriesList: null,
  myStoriesFetchState: null,
  allStoriesList: null,
  allStoriesFetchState: null
};

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    // Set user's stories
    case SET_MY_STORIES:
      return { ...store, myStoriesList: action.payload };

    // Set user's stories fetch state
    case SET_MY_STORIES_FETCH_STATE:
      return { ...store, myStoriesFetchState: action.payload };

    // Set common stories
    case SET_ALL_STORIES:
      return { ...store, allStoriesList: action.payload };

    // Set common stories fetch state
    case SET_ALL_STORIES_FETCH_STATE:
      return { ...store, allStoriesFetchState: action.payload };

    default:
      return store;
  }
};

export default reducer;
