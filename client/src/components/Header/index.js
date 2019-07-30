import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserPanel from '../UserPanel';
import Container from '../Container';
import Nav from '../Nav';
import ModalWrap from '../ModalWrap';
import Button from '../Button';
import MenuIcon from './MenuIcon';

import { viewportWidth } from '../../store/viewport/selectors';

import constants from '../../constants';

const HeaderWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  z-index: 10;
  padding-top: 5px;
  padding-bottom: 5px;

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
  /* @media (min-width: ${constants.breakpoints.TABLET}px) {
  } */
`;

const HeaderUserPanelWrap = styled.div`
    flex-shrink: 0;
    flex-grow: 0;
    margin-left: auto;
  /* @media (min-width: ${constants.breakpoints.TABLET}px) {
  } */
`;

const MenuButton = styled(Button)`
  padding: 0;
  width: 40px;
  height: 40px;
  margin-left: auto;
`;

const MenuWrap = styled.div`
  width: 50%;
  min-width: 300px;
  height: 100%;
  padding: 30px 15px;
  overflow-y: auto;
  overflow-x: hidden;

  background-color: white;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    };
  }

  render() {
    return this.props.viewportWidth < constants.breakpoints.TABLET
      ? this.renderButtonMenu()
      : this.renderCommonMenu();
  }

  renderButtonMenu() {
    return (
      <HeaderWrap>
        <HeaderContainer>
          {this.state.isMenuOpen && (
            <ModalWrap closeModal={this.handleMenuClose}>
              <MenuWrap>
                <Nav onLinkClick={this.handleMenuClose} />
              </MenuWrap>
            </ModalWrap>
          )}

          <HeaderNavWrap>
            <MenuButton
              color={constants.styles.DARK_PRIMARY_COLOR}
              onClick={this.handleMenuOpen}
            >
              <MenuIcon />
            </MenuButton>
          </HeaderNavWrap>
          <HeaderUserPanelWrap>
            <UserPanel />
          </HeaderUserPanelWrap>
        </HeaderContainer>
      </HeaderWrap>
    );
  }

  renderCommonMenu() {
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

  handleMenuOpen = () => {
    this.setState({ isMenuOpen: true });
  };

  handleMenuClose = () => {
    this.setState({ isMenuOpen: false });
  };
}

Header.propTypes = {
  viewportWidth: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  viewportWidth: viewportWidth(state)
});

const mapDispatchToProps = {
  // logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
