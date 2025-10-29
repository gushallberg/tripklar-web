import type { Meta, StoryObj } from "@storybook/react";
import SmartButtons from "@/components/SmartButtons";

const meta: Meta<typeof SmartButtons> = {
  title: "Components/SmartButtons",
  component: SmartButtons
};
export default meta;
type Story = StoryObj<typeof SmartButtons>;

export const Default: Story = {
  args: {
    itineraryId: "wk_3pQ2a7",
    scenario: "daytrip",
    deeplinks: {
      transportUrl: "https://go.example/transport",
      lodgingUrl: "https://go.example/lodging",
      activityUrl: "https://go.example/activity"
    }
  }
};

export const WithPartialLinks: Story = {
  args: {
    itineraryId: "we_Z9p8cd",
    scenario: "weekend",
    deeplinks: {
      transportUrl: "https://go.example/transport",
      activityUrl: "https://go.example/activity"
    }
  }
};
