import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FiltersBar from '../FiltersBar';

const meta: Meta<typeof FiltersBar> = {
  title: 'Components/FiltersBar',
  component: FiltersBar
};
export default meta;
type Story = StoryObj<typeof FiltersBar>;

export const Default: Story = {
  args: {
    onApply: fn()
  }
};

export const WithCustomDefaults: Story = {
  args: {
    onApply: fn(),
    initialFilters: { city: 'stockholm', tags: 'design,spa', radiusKm: 180 }
  }
};
