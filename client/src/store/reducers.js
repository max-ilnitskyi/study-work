import { combineReducers } from 'redux';

import notes from './notes/reducer';

const reducer = combineReducers({
  notes
});

export default reducer;
