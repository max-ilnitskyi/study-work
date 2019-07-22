import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from './Button';

const LinkFiltratedForAs = Button.withoutCustomProps(Link);

const show = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StoryWrap = styled.div`
  position: relative;
  padding: 10px;

  background-color: #fff;
  border-radius: 5px;
  border: 2px solid ${props => props.color};

  animation: ${show} 0.5s ease;
`;

const ButtonsWrap = styled.div`
  position: absolute;
  display: flex;
  right: 5px;
  top: 5px;

  opacity: 0.3;

  ${StoryWrap}:hover & {
    opacity: 1;
  }

  & > * {
    margin-left: 5px;
  }
`;

const StoryButton = styled(Button)`
  font-size: 16px;
`;

const StoryTitle = styled.h3`
  ${'' /* here must be styles */}
`;

const StoryText = styled.p`
  ${'' /* here must be styles */}
`;

const StoryAuthor = styled.p`
  font-size: 14px;
  color: grey;
`;

// prop 'glbal' render element without delete button and show author
class Story extends React.Component {
  render() {
    return (
      <StoryWrap color={this.props.color}>
        <ButtonsWrap>
          <StoryButton
            as={LinkFiltratedForAs}
            to={`/story/${this.props._id}`}
            color="#C1CD00"
            outline
          >
            link
          </StoryButton>
          {!this.props.global && (
            <StoryButton
              disabled={this.props.isWaitingDeleteResponse}
              type="button"
              onClick={this.handleDeleteButtonClick}
              color="#FC2727"
              outline
              loading={this.props.isWaitingDeleteResponse}
            >
              delete
            </StoryButton>
          )}
        </ButtonsWrap>
        <StoryTitle>{this.props.title}</StoryTitle>
        <StoryText>{this.props.text}</StoryText>
        {this.props.global && (
          <StoryAuthor>Author: {this.props.user.login || 'none'}</StoryAuthor>
        )}
      </StoryWrap>
    );
  }

  handleDeleteButtonClick = () => {
    // Call deleteStory from props with current story ID
    this.props.deleteStory(this.props._id);
  };
}

Story.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  user: PropTypes.shape({ login: PropTypes.string }),
  deleteStory: PropTypes.func,
  isWaitingDeleteResponse: PropTypes.bool
};

export default Story;
