import React from 'react';
import styled from 'styled-components';

const Pathname = styled.span`
  color: grey;
`;

const ErrorText = styled.h2`
  padding: 15px;
`;

function NotFound(props) {
  return (
    <ErrorText>
      Sorry, Page <Pathname>{props.location.pathname}</Pathname> not found!
    </ErrorText>
  );
}

export default NotFound;
