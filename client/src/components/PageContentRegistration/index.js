import React from 'react';
// import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import FormRegistration from '../FormRegistration';

class PageRegistration extends React.Component {
  render() {
    return (
      <PageContentWrap>
        <Helmet>
          <title>Registration</title>
        </Helmet>
        <FormRegistration />
      </PageContentWrap>
    );
  }
}

export default PageRegistration;
