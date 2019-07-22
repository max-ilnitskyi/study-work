import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import Button from '../Button';

import { postMyStory } from '../../store/stories/actions';
import { messagesActions } from '../Messages';

import { mixins } from '../../styles';
import constants from '../../constants';
import {
  newStoryColorsList as colorsList,
  newStoryTitle as mainTitle,
  newStoryRequestSuccessText,
  newStoryRequestErrorText
} from '../../data';

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
  ${mixins.visuallyHidden}

  & + ${ChooseColorLabel} {
    background-color: ${props => props.value};
  }

  &:checked + ${ChooseColorLabel} {
    box-shadow: 0 0 0 2px white, 0 0 0 4px grey;
  }

  &:focus + ${ChooseColorLabel} {
    box-shadow: 0 0 0 4px grey;
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

// <<<<<<< Styled Components ]

const yupSchema = yup.object().shape({
  title: yup.string().required('Text is required!'),
  text: yup.string().required('Text is required!')
});

class FormNewStory extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          title: '',
          text: '',
          color: colorsList[0]
        }}
        validationSchema={yupSchema}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <StyledForm>
            <Title>{mainTitle}</Title>
            <FormLine>
              <Label htmlFor="FormNewStory.title">Title: </Label>
              <TextField type="text" name="title" id="FormNewStory.title" />
              <StyledError name="title" /> {/* temp */}
            </FormLine>

            <FormLine>
              <FakeLabel>Color:</FakeLabel>
              <ColorsList>
                {colorsList.map(color =>
                  this.renderColorsListItem(color, props.values.color)
                )}
              </ColorsList>
            </FormLine>
            <FormLine>
              <Label htmlFor="FormNewStory.text">Text: </Label>
              <TextArea name="text" id="FormNewStory.text" rows="5" />
              <StyledError name="text" />
            </FormLine>
            <ButtonsWrap>
              <Button
                outline
                type="submit"
                disabled={props.isSubmitting}
                loading={props.isSubmitting}
              >
                Post Story!
              </Button>
              <Button type="reset" outline>
                reset?
              </Button>
            </ButtonsWrap>
          </StyledForm>
        )}
      </Formik>
    );
  }

  renderColorsListItem(color, selectedColor) {
    return (
      <ColorsListItem key={color}>
        <ChooseColor
          name="color"
          id={`FormNewStory.color.${color}`}
          value={color}
          checked={color === selectedColor}
        />
        <ChooseColorLabel htmlFor={`FormNewStory.color.${color}`} />
      </ColorsListItem>
    );
  }

  handleSubmit = (values, formikBag) => {
    this.props.postMyStory(values).then(data => {
      if (data.ok) {
        formikBag.resetForm();
        messagesActions.showSuccess(newStoryRequestSuccessText);
      } else {
        formikBag.setSubmitting(false);
        messagesActions.showError(newStoryRequestErrorText);
      }
    });
  };
}

FormNewStory.propTypes = {
  postMyStory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // here must be selectors, like [prop]: [selector](state);
});

const mapDispatchToProps = {
  postMyStory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormNewStory);
