import React from 'react';
import styled from 'styled-components';

import constants from '../../constants';
import Container from '../Container';

const HeaderWrap = styled.div`
  background-color: ${constants.styles.lightPrimaryColor};
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderWrap>
        <Container>
          <div> Hello! It's header</div>
        </Container>
      </HeaderWrap>
    );
  }
}

export default Header;
