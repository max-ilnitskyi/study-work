import { combineReducers } from 'redux';

import notes from './notes/reducer';
import forms from './forms/reducer';

const reducer = combineReducers({
  notes,
  ...forms
});

export default reducer;
