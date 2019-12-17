import React from 'react';
import { Button } from 'antd';

export default class Buttons extends React.Component {
  handleClick = () => console.log('点击了button');

  render() {
    const { children } = this.props;
    return (
      <Button type='primary' onClick={this.handleClick}>
        {children}
      </Button>
    );
  }
}
