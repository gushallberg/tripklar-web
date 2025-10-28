import type { Meta, StoryObj } from '@storybook/react';
import SponsorBadge from '../SponsorBadge';

const meta: Meta<typeof SponsorBadge> = {
  title: 'Components/SponsorBadge',
  component: SponsorBadge,
  parameters: {
    layout: 'centered'
  }
};
export default meta;
type Story = StoryObj<typeof SponsorBadge>;

export const Default: Story = {};

export const OnDarkBackground: Story = {
  render: () => (
    <div className="rounded-xl bg-slate-800 p-6">
      <SponsorBadge />
    </div>
  )
};
