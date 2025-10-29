export type Deeplinks = {
  transportUrl?: string;
  lodgingUrl?: string;
  activityUrl?: string;
};
export type Place = { placeId: string; name: string; city?: string; lat: number; lon: number };
export type SuggestItem = {
  itineraryId: string;
  title: string;
  summary: string;
  heroImage: string;
  distanceKm?: number;
  priceHint?: string;
  place?: Place;
  deeplinks?: Deeplinks;
  isSponsored?: boolean;
};
export type ItineraryDetail = {
  itineraryId: string;
  title: string;
  summary: string;
  paragraphs?: string[];
  images?: { url: string; alt?: string }[];
  map?: { lat: number; lon: number; zoom: number };
  steps?: { time?: string; text: string }[];
  deeplinks?: Deeplinks;
  pdfUrl?: string;
  icsUrl?: string;
};
