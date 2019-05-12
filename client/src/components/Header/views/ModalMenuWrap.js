import React from 'react';
import PropTypes from 'prop-types';

class ModalMenuWrap extends React.Component {
  render() {
    return (
      <div className="modal-menu-wrap" onClick={this.handleWrapClick}>
        <div className="modal-menu-wrap__body">{this.props.children}</div>
      </div>
    );
  }

  handleWrapClick = e => {
    if (e.target.classList.contains('modal-menu-wrap')) {
      this.props.closeMenu();
    }
  };

  componentDidMount() {
    this.handleEscapeDown = e => {
      if (e.key === 'Escape') {
        this.props.closeMenu();
      }
    };

    window.document.addEventListener('keydown', this.handleEscapeDown);
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.handleEscapeDown);
  }
}

ModalMenuWrap.propTypes = {
  children: PropTypes.any.isRequired,
  closeMenu: PropTypes.func.isRequired
};

export default ModalMenuWrap;
