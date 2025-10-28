import type { Meta, StoryObj } from '@storybook/react';
import SkeletonCard from '../SkeletonCard';

const meta: Meta<typeof SkeletonCard> = {
  title: 'Components/SkeletonCard',
  component: SkeletonCard
};
export default meta;
type Story = StoryObj<typeof SkeletonCard>;

export const Default: Story = {};

export const InList: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
};
