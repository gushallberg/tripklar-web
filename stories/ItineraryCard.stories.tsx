import type { Meta, StoryObj } from "@storybook/react";
import ItineraryCard from "@/components/ItineraryCard";

const meta: Meta<typeof ItineraryCard> = {
  title: "Components/ItineraryCard",
  component: ItineraryCard
};
export default meta;
type Story = StoryObj<typeof ItineraryCard>;

export const Default: Story = {
  args: {
    itineraryId: "wk_3pQ2a7",
    title: "Calm archipelago escape near Göteborg",
    summary: "Start at the ferry, explore coastal paths, fika by the sea.",
    heroImage: "/images/sample/archipelago.jpg",
    distanceKm: 72,
    priceHint: "SEK 600–900",
    isSponsored: false
  }
};

export const Sponsored: Story = {
  args: {
    itineraryId: "dt_q1Lm92",
    title: "Forest lakes loop south of Älmhult",
    summary: "Short drives, quiet paths, and a mid-day swim.",
    heroImage: "/images/sample/lake.jpg",
    distanceKm: 38,
    priceHint: "SEK 0–300",
    isSponsored: true
  }
};
