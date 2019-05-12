import React from 'react';

class HeaderWrap extends React.Component {
  constructor(props) {
    super(props);
    // take space for header with display: fixed
    this.state = { offset: 64 };
    this.header = React.createRef();
  }

  componentDidMount() {
    this.setState({ offset: this.header.current.offsetHeight });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.header.current.offsetHeight !== prevState.offset) {
      this.setState({ offset: this.header.current.offsetHeight });
    }
  }

  render() {
    return (
      <div>
        <div style={{ height: this.state.offset + 'px' }} />
        <header className="header-wrap" ref={this.header}>
          <div className="container header-wrap__container">
            {this.props.children}
          </div>
        </header>
      </div>
    );
  }
}

export default HeaderWrap;
