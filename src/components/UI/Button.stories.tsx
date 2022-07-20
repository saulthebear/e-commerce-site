import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  className: 'bg-blue-500 text-white',
  children: 'Button',
};
export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  className: 'border-2 border-blue-500 text-blue-500',
  children: 'Button',
};
