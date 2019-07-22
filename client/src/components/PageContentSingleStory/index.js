import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import Story from '../Story';
import Loading from '../Loading';

import { fetchSingleStory } from '../../store/stories/actions';

const StoryErrorMessage = styled.h2`
  ${'' /* there must be styles */}
`;

const LoadingWrap = styled.div`
  width: 50px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
`;

class PageContentSingleStory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      story: null,
      fetchState: 'pending'
    };
  }

  render() {
    return (
      <PageContentWrap>
        {this.state.fetchState === 'pending' && (
          <React.Fragment>
            <LoadingWrap>
              <Loading />
            </LoadingWrap>
          </React.Fragment>
        )}

        {this.state.fetchState === 'error' && (
          <React.Fragment>
            <Helmet>
              <title>Unable to load history</title>
            </Helmet>
            <StoryErrorMessage>Unable to load history</StoryErrorMessage>
          </React.Fragment>
        )}

        {this.state.fetchState === 'success' && (
          <React.Fragment>
            <Helmet>
              <title>{`Story - ${this.state.story.title}`}</title>
            </Helmet>
            <Story {...this.state.story} global />
          </React.Fragment>
        )}

        {/* <Helmet>
          <title>{headTitle}</title>
        </Helmet>
        <Story
          {...story}
          global
          isWaitingDeleteResponse={
            this.state.storiesWaitingDeleteResponse[story._id]
          }
        /> */}
      </PageContentWrap>
    );
  }

  componentDidMount() {
    // console.log(this.props.match.params.id);

    this.props.fetchSingleStory(this.props.match.params.id).then(data => {
      // If problem with fetching
      if (!data.ok) return this.setState({ fetchState: 'error' });

      // If there is no problem, set story to component state
      this.setState({ story: data.story, fetchState: 'success' });
    });
  }
}

PageContentSingleStory.propTypes = {
  fetchSingleStory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // here must bbe selectors
});

const mapDispatchToProps = {
  fetchSingleStory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentSingleStory);
