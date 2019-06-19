import React from 'react';
import styled from 'styled-components';

import UserPanel from '../UserPanel';
import Container from '../Container';
import Nav from '../Nav';

import constants from '../../constants';

const HeaderWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  z-index: 10;

  background-color: ${constants.styles.LIGHT_PRIMARY_COLOR};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
`;

const HeaderContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const HeaderNavWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;

const HeaderUserPanelWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  margin-left: auto;
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderWrap>
        <HeaderContainer>
          <HeaderNavWrap>
            <Nav />
          </HeaderNavWrap>
          <HeaderUserPanelWrap>
            <UserPanel />
          </HeaderUserPanelWrap>
        </HeaderContainer>
      </HeaderWrap>
    );
  }
}

export default Header;
