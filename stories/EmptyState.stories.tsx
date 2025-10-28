import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import EmptyState from '../components/EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {}
};

export const WithReset: Story = {
  args: {
    onReset: fn()
  }
};
