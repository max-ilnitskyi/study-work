// this component must be rendered in single place
import React from 'react';
import styled, { keyframes } from 'styled-components';

import Container from './Container';

const MESSAGE_LIFE_TIME = 5;

const show = keyframes`
  from {
    opacity: 0;
    margin-bottom: -50px;
  }

  to {
    opacity: 1;
    margin-bottom: 0;
  }
`;

const hide = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const MessagesWrap = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

const MessageWrap = styled.div`
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  background-color: rgba(218, 233, 239, 0.9);

  animation: ${hide} 0.5s ${MESSAGE_LIFE_TIME - 0.5 + 's'} ease;
`;

const Message = styled.p`
  padding: 15px;

  color: #000;
  color: ${props =>
    (props.type === 'success' && '#050') || (props.type === 'error' && '#500')};

  animation: ${show} 0.5s ease;
`;

const HideAll = styled.button`
  z-index: 100;
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 5px;

  cursor: pointer;
  opacity: 0.5;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 1;
  }
`;

const HideAllContainer = styled(Container)`
  position: relative;
`;

let showMessage;

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    showMessage = this.showMessage.bind(this); // concerns showMessage above
  }

  render() {
    return (
      <MessagesWrap>
        {this.state.messages.map(({ text, type, id }) => (
          <MessageWrap key={id}>
            <Container>
              <Message type={type}>{text}</Message>
            </Container>
          </MessageWrap>
        ))}

        {!this.state.messages.length || (
          <HideAllContainer>
            <HideAll onClick={this.handleHideAll}>hide all</HideAll>
          </HideAllContainer>
        )}
      </MessagesWrap>
    );
  }

  showMessage(text, type = 'inform') {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          text,
          type,
          id: getNewId()
        }
      ]
    });

    setTimeout(() => {
      this.hideFirstMessage();
    }, MESSAGE_LIFE_TIME * 1000);
  }

  // must be used ONLY in this.showMessage
  hideFirstMessage() {
    const restMessages = this.state.messages.slice(1);
    this.setState({
      messages: restMessages
    });
  }

  hideAllMessages() {
    this.setState({
      messages: []
    });
  }

  handleHideAll = () => {
    this.hideAllMessages();
  };
}

let nextId = 1;
function getNewId() {
  return nextId++;
}

new Messages();

const actions = {
  showMessage: (...args) => {
    showMessage(...args);
  }
};

window.showMessage = (text, type) => showMessage(text, type);

export default Messages;
export { actions };
