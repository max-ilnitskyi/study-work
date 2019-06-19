import React from 'react';
import styled from 'styled-components';

import Container from '../Container';

import constants from '../../constants';

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
          {/* temp */}
          <div> Hello! It's footer</div>
        </FooterContainer>
      </FooterWrap>
    );
  }
}

export default Footer;
