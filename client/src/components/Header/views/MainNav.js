import React from 'react';
import PropTypes from 'prop-types';

class MainNav extends React.Component {
  render() {
    return (
      <nav className="main-nav">
        <ul className="main-nav__list">
          {this.props.links.map((link, i) => (
            <li className="main-nav__item" key={link.text}>
              <a
                onClick={this.handleLinkClick}
                className="main-nav__link"
                href={link.address}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  handleLinkClick = () => {
    if (this.props.closeMenu) {
      this.props.closeMenu();
    }
  };
}

MainNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired
    })
  ),
  // undefined for desktops
  closeMenu: PropTypes.func
};

export default MainNav;
