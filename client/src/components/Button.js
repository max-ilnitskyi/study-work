import styled from 'styled-components';

import constants from '../constants';

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
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s;

  ${({ outline, mainColor, whiteColor, greyColor }) => `
  color: ${outline ? mainColor : whiteColor};
  border: 2px solid ${mainColor};
  background-color: ${outline ? whiteColor : mainColor};

  :hover {
    color: ${outline ? whiteColor : mainColor};
    background-color: ${outline ? mainColor : whiteColor};
  }

  :disabled {
    cursor: default;
    background-color: ${outline ? whiteColor : greyColor};
    color: ${outline ? greyColor : whiteColor};
    border: 2px solid ${greyColor};
  }`}
`;

export default Button;
