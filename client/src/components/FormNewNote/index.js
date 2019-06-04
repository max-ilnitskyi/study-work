import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import Loading from '../Loading';

import constants from '../../constants';

// import { notesList } from '../../store/notes/selectors';
import { postNote } from '../../store/notes/actions';
import { actions as messagesActions } from '../Messages';
console.log(messagesActions);

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

class FormNewNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      message: null
    };
  }

  render() {
    console.log(this.props); //temp
    return (
      <Formik
        initialValues={{
          title: '',
          text: '',
          color: constants.styles.PRIMARY_COLOR // must be the same as checked
        }}
        validationSchema={yupSchema}
        onSubmit={this.handleSubmit}
      >
        {props => (
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
                checked={props.values.color === constants.styles.PRIMARY_COLOR}
              />
              <ChooseColorLabel htmlFor="FormNewNote.color.default" />

              <ChooseColor
                name="color"
                id="FormNewNote.color.red"
                value="red"
              />
              <ChooseColorLabel htmlFor="FormNewNote.color.red" />

              <ChooseColor
                name="color"
                id="FormNewNote.color.green"
                value="green"
              />
              <ChooseColorLabel htmlFor="FormNewNote.color.green" />

              <ChooseColor
                name="color"
                id="FormNewNote.color.blue"
                value="blue"
              />
              <ChooseColorLabel htmlFor="FormNewNote.color.blue" />
            </FormLine>
            <FormLine>
              <Label htmlFor="FormNewNote.text">Text: </Label>
              <TextArea name="text" id="FormNewNote.text" rows="5" />
              <StyledError name="text" />
            </FormLine>
            <Button type="submit" disabled={props.isSubmitting}>
              Post note!
            </Button>
            <Button style={{ marginLeft: '20px' }} type="reset">
              reset?
            </Button>
            {props.isSubmitting && (
              <LoadingWrap>
                <Loading />
              </LoadingWrap>
            )}
            {this.state.status && <p>{this.state.status}</p>}
          </StyledForm>
        )}
      </Formik>
    );
  }

  handleSubmit = (values, formikBag) => {
    this.props.postNote(
      values,
      () => {
        this.setState({ status: 'Success' });
        messagesActions.showMessage('You made new post!', 'success');
        setTimeout(() => {
          this.setState({ status: null });
        }, 2000);
        formikBag.resetForm();
      },
      () => {
        this.setState({ status: 'Error' });
        messagesActions.showMessage('An error has occurred.', 'error');
        setTimeout(() => {
          this.setState({ status: null });
        }, 2000);
        formikBag.setSubmitting(false);
      }
    );
  };
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
