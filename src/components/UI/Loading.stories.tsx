import React from 'react';
import { ComponentStory } from '@storybook/react';

import Loading from './Loading';

export default {
  title: 'UI/Loading',
  component: Loading,
};

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const LoadingIndicator = Template.bind({});
LoadingIndicator.args = {};
