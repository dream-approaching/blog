import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '~/stories/button';

export default {
  title: 'Button'
};

export const text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const emoji = () => <Button onClick={action('clicked')}>123</Button>;
