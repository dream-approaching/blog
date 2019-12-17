import React from 'react';

export default class Button extends React.Component {
  handleClick = () => console.log('点击了button');

  render() {
    const { children } = this.props;
    return <div onClick={this.handleClick}>{children}</div>;
  }
}
