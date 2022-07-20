import React from 'react';
import { ComponentStory } from '@storybook/react';
import FormControl from './FormControl';
import Input from './Input';
import Label from './Label';
import Select from './Select';
import Textarea from './Textarea';

export default {
  title: 'UI/Form/FormControl',
  component: FormControl,
  subcomponents: {
    Input,
    Label,
  },
};

export const input: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args}>
    <Label>Name</Label>
    <Input />
  </FormControl>
);

export const select: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args}>
    <Label>Options</Label>
    <Select>
      <option>Option 1</option>
      <option>Option 2</option>
    </Select>
  </FormControl>
);

export const textarea: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args}>
    <Label>Description</Label>
    <Textarea />
  </FormControl>
);
