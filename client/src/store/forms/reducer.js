import { createForms } from 'react-redux-form';

const initialNoteState = {
  title: '',
  text: '',
  color: ''
};

const reducer = createForms({
  newNoteForm: initialNoteState
});

export default reducer;
