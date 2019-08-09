import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import Story from '../Story';
import Loading from '../Loading';
import Paragraph from '../Paragraph';

import {
  allStoriesList,
  allStoriesFetchState
} from '../../store/stories/selectors';
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
        {!this.props.allStoriesList &&
          this.props.allStoriesFetchState === 'pending' && <Loading standart />}

        {!this.props.allStoriesList &&
          this.props.allStoriesFetchState === 'error' && (
            <Paragraph>
              Here is some problems in loading data. Try to reload page later.
            </Paragraph>
          )}

        {this.props.allStoriesList &&
          this.props.allStoriesList.length === 0 && (
            <Paragraph>There are not any stories yet...</Paragraph>
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
      </PageContentWrap>
    );
  }

  componentDidMount() {
    this.props.fetchAllStories();
  }
}

PageContentMyStories.propTypes = {
  allStoriesList: PropTypes.array,
  fetchAllStories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allStoriesList: allStoriesList(state),
  allStoriesFetchState: allStoriesFetchState(state)
});

const mapDispatchToProps = {
  fetchAllStories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentMyStories);
