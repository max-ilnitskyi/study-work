import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  background-color: red;
`;

class Container extends React.Component {
  render() {
    return (
      <StyledWrapper>
        <div className={classNames('container', this.props.className)}>
          {this.props.children}
        </div>
      </StyledWrapper>
    );
  }
}

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any, // for container
  wrapClassName: PropTypes.any
};

export default Container;
