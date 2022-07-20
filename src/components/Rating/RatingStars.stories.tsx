import React from 'react';
import { ComponentStory } from '@storybook/react';

import RatingStars from './RatingStars';

export default {
  title: 'Rating/RatingStars',
  component: RatingStars,
};

const Template: ComponentStory<typeof RatingStars> = (args) => (
  <RatingStars {...args} />
);

export const Stars = Template.bind({});
Stars.args = {
  rating: 4.5,
};
