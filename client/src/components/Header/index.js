import React from 'react';
import styled from 'styled-components';

import constants from '../../constants';
import Container from '../Container';
import Nav from '../Nav';

const HeaderWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  z-index: 10;

  background-color: ${constants.styles.lightPrimaryColor};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderWrap>
        <Container>
          <Nav />
        </Container>
      </HeaderWrap>
    );
  }
}

export default Header;
