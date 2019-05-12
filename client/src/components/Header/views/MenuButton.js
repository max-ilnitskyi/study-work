import React from 'react';
import PropTypes from 'prop-types';

class MenuButton extends React.Component {
  render() {
    return (
      <button
        className="menu-button"
        type="button"
        onClick={this.handleButtonClick}
      />
    );
  }

  handleButtonClick = () => {
    this.props.openMenu();
  };
}

MenuButton.propTypes = {
  openMenu: PropTypes.func.isRequired
};

export default MenuButton;
