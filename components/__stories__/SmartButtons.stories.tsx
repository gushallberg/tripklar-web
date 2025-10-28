import type { Meta, StoryObj } from '@storybook/react';
import SmartButtons from '../SmartButtons';

const meta: Meta<typeof SmartButtons> = {
  title: 'Components/SmartButtons',
  component: SmartButtons
};
export default meta;
type Story = StoryObj<typeof SmartButtons>;

export const Default: Story = {
  args: {
    itineraryId: 'wk_3pQ2a7',
    scenario: 'daytrip',
    deeplinks: { transportUrl: '#', lodgingUrl: '#', activityUrl: '#' }
  }
};

export const WithRealisticLinks: Story = {
  args: {
    itineraryId: 'we_Z9p8cd',
    scenario: 'weekend',
    deeplinks: {
      transportUrl: '/go/vasttrafik?target=...',
      lodgingUrl: '/go/booking?target=...',
      activityUrl: '/go/getyourguide?target=...'
    }
  }
};
