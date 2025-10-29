import type { ItineraryDetail, SuggestItem } from './types';

const base = () => process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

export async function getSuggest(qs: Record<string, string | number | undefined>): Promise<SuggestItem[]> {
  const query = new URLSearchParams(
    Object.entries(qs).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = String(v);
      return acc;
    }, {} as Record<string, string>)
  ).toString();
  const url = base() ? `${base()}/api/suggest?${query}` : `/api/mock/suggest?${query}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Suggest failed');
  return res.json();
}

export async function getItinerary(id: string): Promise<ItineraryDetail> {
  const url = base() ? `${base()}/api/itineraries/${id}` : `/api/mock/itineraries/${id}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Itinerary failed');
  return res.json();
}
