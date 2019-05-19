import React from 'react';
import styled from 'styled-components';

// import constants from '../../constants';
import Container from '../Container';

import bgPattern from '../../assets/imgs/bg-pattern-13.png';

const MainContentWrap = styled.div`
  height: 100%;
  background-image: url(${bgPattern});
  background-size: 80px;
`;

const MainContentContainer = styled(Container)`
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

class MainContent extends React.Component {
  render() {
    return (
      <MainContentWrap>
        <MainContentContainer>
          <div> Hello! It's main content</div>
        </MainContentContainer>
      </MainContentWrap>
    );
  }
}

export default MainContent;
