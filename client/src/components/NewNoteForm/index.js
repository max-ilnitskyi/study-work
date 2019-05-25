import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import PropTypes from 'prop-types';

import constants from '../../constants';

// import { notesList } from '../../store/notes/selectors';
import { postNote } from '../../store/notes/actions';

const StyledForm = styled(Form)`
  padding: 20px 10px;

  border: 3px solid ${constants.styles.SECONDARY_COLOR};
  border-radius: 5px;
`;

const Label = styled.label``;

const TextField = styled(Control.text)`
  margin-left: auto;
`;

const FormLine = styled.div`
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }
`;

const Button = styled.button`
  display: inline-block;
  margin-top: 10px;

  font-size: 20px;
  font-weight: 600;
  color: ${constants.styles.SECONDARY_COLOR};
  border: 2px solid ${constants.styles.SECONDARY_COLOR};
  border-radius: 3px;
  background-color: #fff;

  :hover {
    cursor: pointer;
    color: #fff;
    background-color: ${constants.styles.SECONDARY_COLOR};
  }
`;

class NewNoteForm extends React.Component {
  render() {
    return (
      <StyledForm
        model="newNoteForm"
        onSubmit={data => this.handleFormSubmit(data)}
      >
        <FormLine>
          <Label htmlFor="newNoteForm.title">Title:</Label>
          <TextField model="newNoteForm.title" id="newNoteForm.title" />
        </FormLine>

        <FormLine>
          <Label htmlFor="newNoteForm.text">Text:</Label>
          <TextField model="newNoteForm.text" id="newNoteForm.text" />
        </FormLine>

        <FormLine>
          <Label htmlFor="newNoteForm.color">Color:</Label>
          <TextField model="newNoteForm.color" id="newNoteForm.color" />
        </FormLine>

        <Button type="submit">Poste note!</Button>
      </StyledForm>
    );
  }

  handleFormSubmit = data => {
    console.log(data); //temp
    this.props.postNote(data);
  };
}

NewNoteForm.propTypes = {
  postNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // notesList: notesList(state)
});

const mapDispatchToProps = {
  postNote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNoteForm);
