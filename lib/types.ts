// lib/types.ts

// ---- Suggest / Daytrip ----
export type SuggestParams = {
  scenario: string;
  city: string;
  date?: string;
  radiusKm?: number;
  tags?: string[];
  limit?: number;
};

// Viktigt: inkludera fält som UI:t förväntar sig (itineraryId, heroImage)
export type SuggestItem = {
  id: string;
  title: string;
  summary?: string;
  distanceKm?: number;
  durationHours?: number;
  tags?: string[];
  image?: string;
  heroImage?: string;
  url?: string;           // extern/intern länk
  itineraryId?: string;   // koppling till itinerary
};

export type SuggestResponse = {
  items: SuggestItem[];
  meta?: {
    scenario: string;
    city: string;
    date?: string;
    radiusKm: number;
    limit: number;
    tags?: string[];
  };
};

// ---- Itinerary ----
export type ItineraryStop = {
  id?: string;
  title?: string;
  notes?: string;
  durationMinutes?: number;
};

export type ItineraryDay = {
  title?: string;
  stops?: ItineraryStop[];
};

export type Itinerary = {
  id: string;
  title: string;
  description?: string;
  paragraphs?: string[];     // <- gör .map(paragraph: string, index: number) typesafe
  days?: ItineraryDay[];
};
