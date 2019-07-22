import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import FormNewStory from '../FormNewStory';
import Story from '../Story';

import { myStoriesList } from '../../store/stories/selectors';
import { fetchMyStories, deleteMyStory } from '../../store/stories/actions';
import { messagesActions } from '../Messages';
import {
  headTitleMyStories as headTitle,
  deleteStoryRequestSuccessText,
  deleteStoryRequestErrorText
} from '../../data';

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
        {this.props.myStoriesList && this.props.myStoriesList.length === 0 && (
          <StoriesMessage>
            You still have not stories! Create one with the form below.
          </StoriesMessage>
        )}
        <StoriesList>
          {this.props.myStoriesList &&
            this.props.myStoriesList.map(story => (
              <StoriesListItem key={story._id}>
                <Story
                  {...story}
                  deleteStory={this.deleteStory}
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
    this.props.fetchMyStories();
  }

  deleteStory = storyId => {
    this.setState({
      storiesWaitingDeleteResponse: {
        ...this.state.storiesWaitingDeleteResponse,
        [storyId]: true
      }
    });

    this.props.deleteMyStory(storyId).then(data => {
      if (data.ok) {
        messagesActions.showSuccess(deleteStoryRequestSuccessText);
        this.setState({
          storiesWaitingDeleteResponse: {
            ...this.state.storiesWaitingDeleteResponse,
            [storyId]: false
          }
        });
      } else {
        messagesActions.showError(deleteStoryRequestErrorText);
        this.setState({
          storiesWaitingDeleteResponse: {
            ...this.state.storiesWaitingDeleteResponse,
            [storyId]: false
          }
        });
      }
    });
  };
}

PageContentMyStories.propTypes = {
  myStoriesList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      color: PropTypes.string,
      user: PropTypes.string
    })
  ),
  fetchMyStories: PropTypes.func.isRequired,
  deleteMyStory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  myStoriesList: myStoriesList(state)
});

const mapDispatchToProps = {
  fetchMyStories,
  deleteMyStory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentMyStories);
