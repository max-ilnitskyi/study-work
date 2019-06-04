import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
// import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

import constants from '../../constants';

// import { registrationLink } from '../../data';

// import { notesList } from '../../store/notes/selectors';
// import { setUser } from '../../store/user/actions';
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

const SigninButton = styled.button`
  flex-shrink: 0;
  flex-grow: 0;

  font-size: 20px;
  font-weight: 600;
  color: ${constants.styles.SECONDARY_COLOR};
  border: 2px solid ${constants.styles.SECONDARY_COLOR};
  ${'' /* border-radius: 3px; */}
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
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

// const Text = styled.p`
//   font-size: 14px;
// `;
//
// const StyledLink = styled(NavLink)``;
// <<<<<<< Styled Components ]

class FormSignin extends React.Component {
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
              <TextField type="text" name="password" placeholder="password" />
            </FieldsWrap>

            <SigninButton type="submit" disabled={this.props.isSubmitting}>
              Sign in
            </SigninButton>
            {/* <Text>
          Or <StyledLink to={registrationLink.href}>sign up</StyledLink>
        </Text> */}
          </FormWrap>
        )}
      </Formik>
    );
  }

  handleSubmit = (values, formikBag) => {
    // here will be handler
  };
}

FormSignin.propTypes = {
  // setUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // notesList: notesList(state)
});

const mapDispatchToProps = {
  // setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormSignin);
