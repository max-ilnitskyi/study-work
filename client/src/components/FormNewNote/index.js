import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import constants from '../../constants';

// import { notesList } from '../../store/notes/selectors';
import { postNote } from '../../store/notes/actions';

const StyledForm = styled(Form)`
  padding: 20px 10px;

  border: 5px solid ${constants.styles.SECONDARY_COLOR};
  border-radius: 5px;
`;

const Label = styled.label`
  ${'' /* here must be styles */}
`;

const TextField = styled(Field)`
  margin-left: auto;
`;

const StyledError = styled(ErrorMessage).attrs({ component: 'p' })`
  color: red;
`;

const FormLine = styled.div`
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }
`;

const Button = styled.button`
  ${'' /* display: inline-block;
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
  } */}
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

class FormNewNote extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{ title: '', text: '', color: '' }}
        validate={this.validate}
        onSubmit={this.handleFormSubmit}
      >
        {({ isSubmitting, errors }) => (
          <StyledForm>
            <Title>Create new note:</Title>
            <FormLine>
              <Label htmlFor="forms.newNote.title">Title: </Label>
              <TextField type="text" name="title" id="forms.newNote.title" />
            </FormLine>

            <FormLine>
              <Label htmlFor="forms.newNote.text">Text: </Label>
              <TextField type="text" name="text" id="forms.newNote.text" />
              <StyledError name="text" />
            </FormLine>

            <FormLine>
              <Label htmlFor="forms.newNote.color">Color:</Label>
              <TextField type="text" name="color" id="forms.newNote.color" />
            </FormLine>

            <Button type="submit" disabled={isSubmitting}>
              Poste note!
            </Button>
          </StyledForm>
        )}
      </Formik>
    );
  }

  handleFormSubmit = (data, { setSubmitting }) => {
    console.log(data); //temp
    setSubmitting(true);
    this.props.postNote(data);
  };

  validate(values) {
    let errors = {};
    if (!values.text) {
      errors.text = 'Required';
    }
    return errors;
  }
}

FormNewNote.propTypes = {
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
)(FormNewNote);
