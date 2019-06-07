import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import Loading from '../Loading';
import Button from '../Button';

import constants from '../../constants';
import { newNoteColorsList as colorsList } from '../../data';

import { postNote } from '../../store/notes/actions';
import { actions as messagesActions } from '../Messages';

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

const ColorsList = styled.ul`
  display: inline-block;
`;

const ColorsListItem = styled.li`
  display: inline-block;
  margin-left: 5px;
`;

const ChooseColorLabel = styled.label`
  display: inline-block;
  width: 20px;
  height: 20px;

  border-radius: 50%;
  cursor: pointer;
`;

const ChooseColor = styled(Field).attrs({ type: 'radio' })`
  display: none;

  & + ${ChooseColorLabel} {
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

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const LoadingWrap = styled.div`
  display: inline-block;
  width: 20px;
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
              <ColorsList>
                <ColorsListItem>
                  <ChooseColor
                    name="color"
                    id="FormNewNote.color.default"
                    value={constants.styles.PRIMARY_COLOR} // must be the same as initialValues
                    checked={
                      props.values.color === constants.styles.PRIMARY_COLOR
                    }
                  />
                  <ChooseColorLabel htmlFor="FormNewNote.color.default" />
                </ColorsListItem>

                {colorsList.map(color => (
                  <ColorsListItem key={color}>
                    <ChooseColor
                      name="color"
                      id={`FormNewNote.color.${color}`}
                      value={color}
                    />
                    <ChooseColorLabel htmlFor={`FormNewNote.color.${color}`} />
                  </ColorsListItem>
                ))}
              </ColorsList>
            </FormLine>
            <FormLine>
              <Label htmlFor="FormNewNote.text">Text: </Label>
              <TextArea name="text" id="FormNewNote.text" rows="5" />
              <StyledError name="text" />
            </FormLine>
            <ButtonsWrap>
              <Button type="submit" disabled={props.isSubmitting}>
                Post note!
                {props.isSubmitting && (
                  <LoadingWrap>
                    <Loading />
                  </LoadingWrap>
                )}
              </Button>
              <Button type="reset" view="outline">
                reset?
              </Button>
            </ButtonsWrap>
          </StyledForm>
        )}
      </Formik>
    );
  }

  handleSubmit = (values, formikBag) => {
    this.props.postNote(
      values,
      () => {
        messagesActions.showMessage('You made new post!', 'success');
        formikBag.resetForm();
      },
      () => {
        messagesActions.showMessage('An error has occurred.', 'error');
        formikBag.setSubmitting(false);
      }
    );
  };
}

FormNewNote.propTypes = {
  postNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // here must be selectors, like [prop]: [selector](state);
});

const mapDispatchToProps = {
  postNote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormNewNote);
