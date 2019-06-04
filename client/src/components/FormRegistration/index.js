import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import constants from '../../constants';

// import { notesList } from '../../store/notes/selectors';
import { setUser } from '../../store/user/actions';
// import Loading from '../Loading';

// [ Styled Components >>>>>>>
const FormWrap = styled(Form)`
  padding: 20px 10px;

  border: 5px solid ${constants.styles.SECONDARY_COLOR};
  border-radius: 5px;
`;

const Label = styled.label`
  ${'' /* here must be styles */}
`;

// const FakeLabel = styled.span`
//   ${'' /* here must be styles */}
// `;

const TextField = styled(Field)`
  ${'' /* here must be styles */}
`;

const AcceptRulesLabel = styled.label`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 5px;

  border: 2px solid black;
  border-radius: 50%;
`;

const AcceptRules = styled(Field).attrs({ type: 'checkbox' })`
  display: none;

  &:checked + ${AcceptRulesLabel} {
    background-color: green;
  }
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
// <<<<<<< Styled Components ]
const yupSchema = yup.object().shape({
  login: yup
    .string()
    .min(3, 'Need more!')
    .required('Login is required!'),
  password1: yup
    .string()
    .min(3, 'Need more!')
    .required('Password is required!'),
  password2: yup
    .string()
    .min(3, 'Need more!')
    .required('Please, repeat password!')
    .oneOf([yup.ref('password1')], 'not like previous'),
  accept: yup
    .boolean()
    .oneOf([true], 'Your must accept our rules for registration!')
});

class FormRegistration extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          login: '',
          password1: '',
          password2: '',
          accept: false // must be the same as checked
        }}
        validationSchema={yupSchema}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <FormWrap>
            <Title>Create new account:</Title>
            <FormLine>
              <Label htmlFor="FormRegistration.login">Login: </Label>
              <TextField type="text" name="login" id="FormRegistration.login" />
              <StyledError name="login" />
            </FormLine>

            <FormLine>
              <Label htmlFor="FormRegistration.password1">Password: </Label>
              <TextField
                type="password"
                name="password1"
                id="FormRegistration.password1"
              />
              <StyledError name="password1" />
            </FormLine>

            <FormLine>
              <Label htmlFor="FormRegistration.password2">
                Repeat password:{' '}
              </Label>
              <TextField
                type="password"
                name="password2"
                id="FormRegistration.password2"
              />
              <StyledError name="password2" />
            </FormLine>

            <FormLine>
              <Label htmlFor="FormRegistration.accept">
                Do you accept our rules?
              </Label>
              <AcceptRules
                name="accept"
                id="FormRegistration.accept"
                value="yes"
              />
              <AcceptRulesLabel htmlFor="FormRegistration.accept" />
              <StyledError name="accept" />
            </FormLine>

            <Button type="submit" disabled={this.props.isSubmitting}>
              Registrate new user!
            </Button>
            <Button style={{ marginLeft: '20px' }} type="reset">
              reset?
            </Button>
          </FormWrap>
        )}
      </Formik>
    );
  }

  handleSubmit = (values, formikBag) => {
    console.log('---test actions', formikBag);
    console.log('---test data', values);
    formikBag.props.postNote(
      values,
      formikBag.resetForm,
      formikBag.setSubmitting
    );
  };
}

FormRegistration.propTypes = {
  setUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // notesList: notesList(state)
});

const mapDispatchToProps = {
  setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormRegistration);
