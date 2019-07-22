import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import FormNewStory from '../FormNewStory';
import Story from '../Story';

import { allStoriesList } from '../../store/stories/selectors';
import { fetchAllStories } from '../../store/stories/actions';
import { headTitleAllStories as headTitle } from '../../data';

const StoriesList = styled.div`
  ${'' /* here must be styles */}
`;

const StoriesListItem = styled.div`
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
`;

const NewStoryFormWrap = styled.div`
  margin-top: 30px;
`;

const StoriesMessage = styled.p`
  margin-top: 18px;
`;

class PageContentMyStories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storiesWaitingDeleteResponse: {}
    };
  }

  render() {
    return (
      <PageContentWrap>
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>
        {this.props.allStoriesList &&
          this.props.allStoriesList.length === 0 && (
            <StoriesMessage>There are not any stories yet...</StoriesMessage>
          )}
        <StoriesList>
          {this.props.allStoriesList &&
            this.props.allStoriesList.map(story => (
              <StoriesListItem key={story._id}>
                <Story
                  {...story}
                  global
                  isWaitingDeleteResponse={
                    this.state.storiesWaitingDeleteResponse[story._id]
                  }
                />
              </StoriesListItem>
            ))}
        </StoriesList>
        <NewStoryFormWrap>
          <FormNewStory />
        </NewStoryFormWrap>
      </PageContentWrap>
    );
  }

  componentDidMount() {
    this.props.fetchAllStories();
  }
}

PageContentMyStories.propTypes = {
  allStoriesList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      color: PropTypes.string,
      user: PropTypes.shape({ login: PropTypes.string })
    })
  ),
  fetchAllStories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allStoriesList: allStoriesList(state)
});

const mapDispatchToProps = {
  fetchAllStories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentMyStories);
