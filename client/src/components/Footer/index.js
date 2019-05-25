import React from 'react';
import styled from 'styled-components';

import constants from '../../constants';
import Container from '../Container';

const FooterWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;

  color: #fff;
  background-color: ${constants.styles.DARK_PRIMARY_COLOR};
`;

const FooterContainer = styled(Container)`
  padding-top: 15px;
  padding-bottom: 15px;
`;

class Footer extends React.Component {
  render() {
    return (
      <FooterWrap>
        <FooterContainer>
          <div> Hello! It's footer</div>
        </FooterContainer>
      </FooterWrap>
    );
  }
}

export default Footer;
