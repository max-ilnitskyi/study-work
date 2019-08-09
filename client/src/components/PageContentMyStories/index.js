import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import FormNewStory from '../FormNewStory';
import Story from '../Story';
import TextLink from '../TextLink';
import Paragraph from '../Paragraph';
import Loading from '../Loading';

import {
  myStoriesList,
  myStoriesFetchState
} from '../../store/stories/selectors';
import { user } from '../../store/user/selectors';
import { fetchMyStories, deleteMyStory } from '../../store/stories/actions';
import { messagesActions } from '../Messages';
import {
  headTitleMyStories as headTitle,
  deleteStoryRequestSuccessText,
  deleteStoryRequestErrorText,
  registrationLink
} from '../../data';

const StoriesList = styled.div`
  margin-top: 30px;
`;

const StoriesListItem = styled.div`
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
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

        {this.props.user && <FormNewStory />}

        {this.props.user &&
          !this.props.myStoriesList &&
          this.props.myStoriesFetchState === 'pending' && <Loading standart />}

        {this.props.user &&
          !this.props.myStoriesList &&
          this.props.myStoriesFetchState === 'error' && (
            <Paragraph>
              There is some problems in loading data. Try to reload page later.
            </Paragraph>
          )}

        {this.props.user &&
          this.props.myStoriesList &&
          this.props.myStoriesList.length === 0 && (
            <Paragraph>
              Here are not any stories yet. Create one with the form above.
            </Paragraph>
          )}

        {!this.props.user && (
          <Paragraph>
            To post your own stories you need sign in with form at the upper
            right corner (or{' '}
            <TextLink to={registrationLink.href}>create new account</TextLink>{' '}
            if you have not any yet).
          </Paragraph>
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
  myStoriesList: PropTypes.array,
  fetchMyStories: PropTypes.func.isRequired,
  deleteMyStory: PropTypes.func.isRequired,
  myStoriesFetchState: PropTypes.string,
  user: PropTypes.shape({})
};

const mapStateToProps = state => ({
  myStoriesList: myStoriesList(state),
  myStoriesFetchState: myStoriesFetchState(state),
  user: user(state)
});

const mapDispatchToProps = {
  fetchMyStories,
  deleteMyStory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentMyStories);
