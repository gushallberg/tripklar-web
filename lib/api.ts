// lib/api.ts
import type { ItineraryDetail, SuggestItem } from './types';

const apiBase = () => process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

/**
 * När vi SSR:ar i Node behöver fetch en absolut URL.
 * Vi använder NEXT_PUBLIC_SITE_URL om satt, annars localhost:3000 (Playwrights webServer-port).
 */
function absolute(prefix: string) {
  if (typeof window !== 'undefined') return prefix; // i browser funkar relativa länkar
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    `http://localhost:${process.env.PORT || 3000}`;
  return origin + prefix;
}

export async function getSuggest(qs: Record<string, string | number | undefined>): Promise<SuggestItem[]> {
  const query = new URLSearchParams(
    Object.entries(qs).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = String(v);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const url = apiBase()
    ? `${apiBase()}/api/suggest?${query}`
    : absolute(`/api/mock/suggest?${query}`);

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Suggest failed');
  return res.json();
}

export async function getItinerary(id: string): Promise<ItineraryDetail> {
  const url = apiBase()
    ? `${apiBase()}/api/itineraries/${id}`
    : absolute(`/api/mock/itineraries/${id}`);

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Itinerary failed');
  return res.json();
}
