import React from 'react';
import { ComponentStory } from '@storybook/react';

import Rating from './Rating';

export default {
  title: 'Rating/Rating',
  component: Rating,
};

const Template: ComponentStory<typeof Rating> = (args) => <Rating {...args} />;

export const Default = Template.bind({});
Default.args = {
  rating: 4.5,
  count: 245,
};

export const Large = Template.bind({});
Large.args = {
  rating: 4.5,
  count: 245,
  size: 'large',
};
