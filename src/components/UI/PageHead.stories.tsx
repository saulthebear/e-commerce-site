import React from 'react';
import { ComponentStory } from '@storybook/react';

import PageHead from './PageHead';

export default {
  title: 'UI/Page Head',
  component: PageHead,
};

const Template: ComponentStory<typeof PageHead> = (args) => (
  <PageHead {...args} />
);

export const HeadingOnly = Template.bind({});
HeadingOnly.args = {
  title: 'Accessories',
};

export const HeadingAndDescription = Template.bind({});
HeadingAndDescription.args = {
  title: 'Accessories',
  description:
    'You could collect all of our little accessories and glue them together to create on big Mythical accessory. Or, just enjoy them the way they are.',
};
