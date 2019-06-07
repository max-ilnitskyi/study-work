import styled from 'styled-components';

import constants from '../constants';

const secondaryColor = constants.styles.SECONDARY_COLOR;
const backgroundColor = '#fff';

const Button = styled.button`
  display: block;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 0;
  padding-bottom: 0;

  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  text-align: center;
  color: ${constants.styles.SECONDARY_COLOR};
  border: 2px solid ${constants.styles.SECONDARY_COLOR};
  border-radius: 5px;
  background-color: #fff;

  :hover {
    cursor: pointer;
    color: #fff;
    background-color: ${constants.styles.SECONDARY_COLOR};
  }

  :disabled {
    cursor: default;
    background-color: #fff;
    color: grey;
    border: 2px solid grey;
  }
`;
export default Button;
