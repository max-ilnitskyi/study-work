import React from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import FormRegistration from '../FormRegistration';

// import { notesList } from '../../store/notes/selectors';
// import { fetchNotes, deleteNote } from '../../store/notes/actions';

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

  // componentDidMount() {
  //   this.props.fetchNotes();
  // }
}

PageRegistration.propTypes = {
  notesList: PropTypes.shape({
    text: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  // notesList: notesList(state)
});

const mapDispatchToProps = {
  // fetchNotes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageRegistration);
