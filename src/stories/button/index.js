import React from 'react';
import './index.less';
import MarkView from '~/components/MarkView';
import readme from '~/components/AvatarList/index.zh-CN.md';
import CodeExample from '~/components/CodeExample';
// eslint-disable-next-line
import Demo1Raw from '!raw-loader!./demo1';
import Demo1 from './demo1';

export default class Buttons extends React.Component {
  render() {
    return (
      <MarkView readme={readme} name='AvatarList'>
        <CodeExample title='基本用法' code={Demo1Raw}>
          <Demo1 />
        </CodeExample>
      </MarkView>
    );
  }
}
