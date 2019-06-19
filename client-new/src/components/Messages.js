// this component must be rendered in single place
import React from 'react';
import styled, { keyframes } from 'styled-components';

import Container from './Container';

const MESSAGE_LIFE_TIME = 3;
const SHOW_TRANSITION = 0.5;
const HIDE_TRANSITION = 0.5;

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

const Message = styled.p`
  padding: 15px;
`;

const MessageWrap = styled.div`
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  background-color: rgba(230, 230, 230, 0.9);
  background-color: ${props =>
    (props.type === 'success' && 'rgba(218, 233, 239, 0.9)') ||
    (props.type === 'error' && 'rgba(239, 233, 218, 0.9)')};
  & ${Message} {
    color: #000;
    color: ${props =>
      (props.type === 'success' && '#050') ||
      (props.type === 'error' && '#500')};
  }

  animation: ${show} ${SHOW_TRANSITION + 's'} ease,
    ${hide} ${HIDE_TRANSITION + 's'}
      ${MESSAGE_LIFE_TIME - HIDE_TRANSITION + 's'} ease;
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

// for future exports
let showMessage, showSuccess, showError;

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    // bindings below for exports
    showMessage = this.showMessage.bind(this);
    showSuccess = this.showSuccess.bind(this);
    showError = this.showError.bind(this);
  }

  render() {
    return (
      <MessagesWrap>
        {this.state.messages.map(({ text, type, id }) => (
          <MessageWrap key={id} type={type}>
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
    const id = getNewId();

    const hideTimeout = setTimeout(() => {
      this.hideMessage(id);
    }, MESSAGE_LIFE_TIME * 1000);

    this.setState({
      messages: [
        ...this.state.messages,
        {
          text,
          type,
          hideTimeout,
          id
        }
      ]
    });
  }

  showSuccess(text) {
    this.showMessage(text, 'success');
  }

  showError(text) {
    this.showMessage(text, 'error');
  }

  hideMessage(id) {
    const messages = [...this.state.messages];
    const targetIndex = messages.findIndex(message => message.id === id);

    if (targetIndex !== -1) {
      messages.splice(targetIndex, 1);
      this.setState({
        messages
      });
    } else {
      console.log('--- message not found, can not delete, id: ', id); //temp
    }
  }

  hideAllMessages() {
    this.state.messages.forEach(message => {
      clearTimeout(message.hideTimeout);
    });

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

const messagesActions = {
  showMessage: (...args) => {
    showMessage(...args);
  },
  showSuccess: (...args) => {
    showSuccess(...args);
  },
  showError: (...args) => {
    showError(...args);
  }
};

window.messagesActions = messagesActions; //temp

export default Messages;
export { messagesActions };
