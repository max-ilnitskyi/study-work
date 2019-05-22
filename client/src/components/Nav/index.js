import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import constants from '../../constants';
import { navLinks } from '../../data';

const StyledNav = styled.ul`
  display: flex;
`;

const StyledNavItem = styled.li``;

const StyledNavLink = styled(NavLink)`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;

  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  color: ${constants.styles.darkSecondaryColor};

  &:hover {
    color: ${constants.styles.secondaryColor};
  }
`;

class Nav extends React.Component {
  render() {
    return (
      <StyledNav>
        {navLinks.map(({ name, href }) => (
          <StyledNavItem key={name}>
            <StyledNavLink to={href}>{name}</StyledNavLink>
          </StyledNavItem>
        ))}
      </StyledNav>
    );
  }
}

export default Nav;
