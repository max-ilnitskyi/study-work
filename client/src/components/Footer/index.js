import React from 'react';
import styled from 'styled-components';

import constants from '../../constants';
import Container from '../Container';

const FooterWrap = styled.div`
  color: #fff;
  background-color: ${constants.styles.darkPrimaryColor};
`;

class Footer extends React.Component {
  render() {
    return (
      <FooterWrap>
        <Container>
          <div> Hello! It's footer</div>
        </Container>
      </FooterWrap>
    );
  }
}

export default Footer;
