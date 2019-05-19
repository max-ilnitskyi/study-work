import styled from 'styled-components';

const Container = styled.div`
  max-width: 740px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: auto;
  margin-right: auto;

  background: ${props => props.background};
`;

export default Container;
