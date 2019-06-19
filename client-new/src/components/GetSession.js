import React from 'react';

import Button from './Button';

import fetchJSON from '../utils/fetchJSON';

class GetSession extends React.Component {
  render() {
    return <Button onClick={this.handleClick}>get session</Button>;
  }

  handleClick = () => {
    fetchJSON.get(
      '/getsession',
      data => console.log(data),
      err => console.log('some problem with session')
    );
  };
}

export default GetSession;
