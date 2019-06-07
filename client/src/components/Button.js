import styled from 'styled-components';

import constants from '../constants';

// const whiteColor = '#fff';
// const greyColor = 'grey';

const Button = styled.button.attrs(props => ({
  mainColor: props.color || constants.styles.SECONDARY_COLOR,
  whiteColor: '#fff',
  greyColor: 'grey'
}))`
  display: block;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 0;
  padding-bottom: 0;

  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  text-align: center;
  color: ${props => (props.outline ? props.mainColor : props.whiteColor)};
  border: 2px solid ${props => props.mainColor};
  border-radius: 5px;
  background-color: ${props =>
    props.outline ? props.whiteColor : props.mainColor};

  :hover {
    cursor: pointer;
    color: ${props => (props.outline ? props.whiteColor : props.mainColor)};
    background-color: ${props =>
      props.outline ? props.mainColor : props.whiteColor};
  }

  :disabled {
    cursor: default;
    background-color: ${props =>
      props.outline ? props.whiteColor : props.greyColor};
    color: ${props => (props.outline ? props.greyColor : props.whiteColor)};
    border: 2px solid ${props => props.greyColor};

`;
export default Button;
