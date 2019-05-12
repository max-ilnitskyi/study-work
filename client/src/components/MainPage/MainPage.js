import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainContent from '../MainContent/MainContent';

class MainPage extends React.Component {
  render() {
    return (
      <div className="layout__wrapper">
        <div className="layout__header">
          <Header />
        </div>
        <div className="layout__main-content">
          <MainContent />
        </div>
        <div className="layout__footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default MainPage;
