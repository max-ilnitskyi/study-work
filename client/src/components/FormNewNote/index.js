import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import Loading from '../Loading';

import constants from '../../constants';

// import { notesList } from '../../store/notes/selectors';
import { postNote } from '../../store/notes/actions';

// [ Styled Components >>>>>>>
const StyledForm = styled(Form)`
  padding: 20px 10px;

  border: 5px solid ${constants.styles.SECONDARY_COLOR};
  border-radius: 5px;
`;

const Label = styled.label`
  ${'' /* here must be styles */}
`;

const FakeLabel = styled.span`
  ${'' /* here must be styles */}
`;

const TextField = styled(Field)`
  ${'' /* here must be styles */}
`;

const ChooseColorLabel = styled.label`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 5px;

  border-radius: 50%;
`;

const ChooseColor = styled(Field).attrs({ type: 'radio' })`
  display: none;

  & + ${ChooseColorLabel} {
    background-color: grey;
    background-color: ${props => props.value};
  }

  &:checked + ${ChooseColorLabel} {
    box-shadow: 0 0 0 2px white, 0 0 0 4px grey;
  }
`;

const TextArea = styled(Field).attrs({ component: 'textarea' })`
  width: 100%;
  resize: none;
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

  :disabled {
    cursor: default;
    background-color: #fff;
    color: grey;
    border: 2px solid grey;
  }
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const LoadingWrap = styled.div`
  width: 100px;
  margin-top: 10px;
`;
// <<<<<<< Styled Components ]

class FormNewNote extends React.Component {
  render() {
    console.log(this.props); //temp
    return (
      <StyledForm>
        <Title>Create new note:</Title>
        <FormLine>
          <Label htmlFor="FormNewNote.title">Title: </Label>
          <TextField type="text" name="title" id="FormNewNote.title" />
          <StyledError name="title" /> {/* temp */}
        </FormLine>

        <FormLine>
          <FakeLabel>Color:</FakeLabel>

          <ChooseColor
            name="color"
            id="FormNewNote.color.default"
            value={constants.styles.PRIMARY_COLOR} // must be the same as default
            checked={this.props.values.color === constants.styles.PRIMARY_COLOR}
          />
          <ChooseColorLabel htmlFor="FormNewNote.color.default" />

          <ChooseColor name="color" id="FormNewNote.color.red" value="red" />
          <ChooseColorLabel htmlFor="FormNewNote.color.red" />

          <ChooseColor
            name="color"
            id="FormNewNote.color.green"
            value="green"
          />
          <ChooseColorLabel htmlFor="FormNewNote.color.green" />

          <ChooseColor name="color" id="FormNewNote.color.blue" value="blue" />
          <ChooseColorLabel htmlFor="FormNewNote.color.blue" />
        </FormLine>
        <FormLine>
          <Label htmlFor="FormNewNote.text">Text: </Label>
          <TextArea name="text" id="FormNewNote.text" rows="5" />
          <StyledError name="text" />
        </FormLine>
        <Button type="submit" disabled={this.props.isSubmitting}>
          Post note!
        </Button>
        <Button style={{ marginLeft: '20px' }} type="reset">
          reset?
        </Button>
        {this.props.isSubmitting && (
          <LoadingWrap>
            <Loading />
          </LoadingWrap>
        )}
        <p>{this.props.status}</p>
      </StyledForm>
    );
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

const yupSchema = yup.object().shape({
  text: yup
    .string()
    .min(3, 'Need more!')
    .required('Text is required!'),
  title: yup
    .string()
    .min(3, 'Need more!')
    .required('Title is required!')
});

const formikOptions = {
  mapPropsToValues: () => ({
    title: '',
    text: '',
    color: constants.styles.PRIMARY_COLOR // must be the same as checked
  }),
  validationSchema: yupSchema,
  handleSubmit: (values, formikBag) => {
    console.log('---test actions', formikBag);
    console.log('---test data', values);
    formikBag.props.postNote(
      values,
      () => {
        formikBag.setStatus('success');
        formikBag.resetForm();
      },
      () => {
        formikBag.setStatus('error');
        formikBag.setSubmitting(false);
      }
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormik(formikOptions)(FormNewNote));
