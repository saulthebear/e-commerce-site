import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavbarDisplay } from './Navbar';

export default {
  title: 'Navbar',
  component: NavbarDisplay,
} as ComponentMeta<typeof NavbarDisplay>;

const Template: ComponentStory<typeof NavbarDisplay> = (args) => (
  <NavbarDisplay {...args} />
);

export const LoggedIn = Template.bind({});

LoggedIn.args = {
  isLoggedIn: true,
  logoutHandler: () => console.log('logout'),
};
