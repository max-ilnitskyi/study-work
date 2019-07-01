import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
// import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../Button';

import constants from '../../constants';
import { messagesActions } from '../Messages';

// import { registrationLink } from '../../data';

// import { notesList } from '../../store/notes/selectors';
import { loginUser } from '../../store/user/actions';
// import Loading from '../Loading';

// [ Styled Components >>>>>>>
const FormWrap = styled(Form)`
  display: flex;
`;

const TextField = styled(Field)`
  display: block;
  width: 150px;
  padding: 3px;

  border: 1px solid ${constants.styles.SECONDARY_COLOR};
`;

const FieldsWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;

const SigninButton = styled(Button)`
  flex-shrink: 0;
  flex-grow: 0;

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
// <<<<<<< Styled Components ]

class FormSigninMini extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          login: '',
          password: ''
        }}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <FormWrap>
            <FieldsWrap>
              <TextField type="text" name="login" placeholder="login" />
              <TextField
                type="password"
                name="password"
                placeholder="password"
              />
            </FieldsWrap>

            <SigninButton type="submit" disabled={this.props.isSubmitting}>
              Sign in
            </SigninButton>
          </FormWrap>
        )}
      </Formik>
    );
  }

  handleSubmit = (values, formikBag) => {
    console.log('---send values', values);
    this.props.loginUser(
      values,
      () => {
        formikBag.resetForm();
      },
      err => {
        formikBag.setSubmitting(false);
        messagesActions.showError(err || 'Sign in error');
      }
    );
  };
}

FormSigninMini.propTypes = {
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // notesList: notesList(state)
});

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormSigninMini);