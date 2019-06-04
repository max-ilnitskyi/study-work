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

let showMessage;

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
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
      </MessagesWrap>
    );
  }

  showMessage(text, type = 'inform') {
    const messageId = getNewId();
    this.setState({
      messages: [
        ...this.state.messages,
        {
          text: text + messageId,
          type,
          id: messageId
        }
      ]
    });

    setTimeout(() => {
      this.deleteFirstMessage();
    }, MESSAGE_LIFE_TIME * 1000);
  }

  // must be used ONLY in this.showMessage
  deleteFirstMessage() {
    const restMessages = this.state.messages.slice(1);
    this.setState({
      messages: restMessages
    });
  }

  componentDidMount() {
    showMessage = this.showMessage.bind(this);
  }
}

let nextId = 1;
function getNewId() {
  return nextId++;
}

const actions = {
  showMessage
};

window.showMessage = (text, type) => showMessage(text, type);

export default Messages;
export { actions };
