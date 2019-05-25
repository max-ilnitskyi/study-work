import React from 'react';
import styled from 'styled-components';

import constants from '../../constants';
import Container from '../Container';
import Nav from '../Nav';

const HeaderWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  z-index: 10;

  background-color: ${constants.styles.LIGHT_PRIMARY_COLOR};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
`;

const HeaderContainer = styled(Container)`
  padding-top: 15px;
  padding-bottom: 15px;
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderWrap>
        <HeaderContainer>
          <Nav />
        </HeaderContainer>
      </HeaderWrap>
    );
  }
}

export default Header;
