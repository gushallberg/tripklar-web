// lib/api.ts

/**
 * Gemensamma typer
 */
export type SuggestParams = {
  scenario: string;
  city: string;
  date?: string;
  radiusKm?: number;
  tags?: string[];
  limit?: number;
};

export type SuggestItem = {
  id: string;
  title: string;
  summary?: string;
  distanceKm?: number;
  durationHours?: number;
  tags?: string[];
  image?: string;
  url?: string; // extern/intern länk
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

export type Itinerary = {
  id: string;
  title: string;
  description?: string;
  days?: Array<{
    title?: string;
    stops?: Array<{
      id?: string;
      title?: string;
      notes?: string;
      durationMinutes?: number;
    }>;
  }>;
};

/**
 * Bas-URL som funkar i SSR/CI och lokalt.
 */
export function getBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = env && env.length > 0 ? env : 'http://localhost:3000';
  return base.replace(/\/+$/, '');
}

/**
 * Tunn fetch-wrapper med timeout + tydliga fel.
 */
async function fetchJson<T>(
  input: string | URL,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
  const { timeoutMs = 15000, ...rest } = init;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(input.toString(), {
      ...rest,
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        ...(rest.headers || {}),
      },
      cache: rest.cache ?? 'no-store',
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `Fetch failed (${res.status} ${res.statusText}) for ${input} — body: ${text.slice(
          0,
          500
        )}`
      );
    }

    return (await res.json()) as T;
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw new Error(`Fetch timeout after ${timeoutMs}ms for ${input}`);
    }
    throw err;
  } finally {
    clearTimeout(t);
  }
}

/**
 * Hämtar förslag (retur: en LISTA, för att matcha daytrip-sidan).
 * Behåll denna signatur tills UI:t eventuellt vill ha metadata.
 */
export async function getSuggest(params: SuggestParams): Promise<SuggestItem[]> {
  const {
    scenario,
    city,
    date = '',
    radiusKm = 150,
    tags = [],
    limit = 3,
  } = params;

  const base = getBaseUrl();
  const url = new URL('/api/mock/suggest', base);

  url.searchParams.set('scenario', scenario);
  url.searchParams.set('city', city);
  url.searchParams.set('date', date);
  url.searchParams.set('radiusKm', String(radiusKm));
  if (tags.length) url.searchParams.set('tags', tags.join(','));
  url.searchParams.set('limit', String(limit));

  const data = await fetchJson<SuggestResponse>(url, { method: 'GET' });
  return Array.isArray(data?.items) ? data.items : [];
}

/**
 * Alternativ helper om du vill komma åt metadata också.
 */
export async function getSuggestResponse(
  params: SuggestParams
): Promise<SuggestResponse> {
  const {
    scenario,
    city,
    date = '',
    radiusKm = 150,
    tags = [],
    limit = 3,
  } = params;

  const base = getBaseUrl();
  const url = new URL('/api/mock/suggest', base);

  url.searchParams.set('scenario', scenario);
  url.searchParams.set('city', city);
  url.searchParams.set('date', date);
  url.searchParams.set('radiusKm', String(radiusKm));
  if (tags.length) url.searchParams.set('tags', tags.join(','));
  url.searchParams.set('limit', String(limit));

  return fetchJson<SuggestResponse>(url, { method: 'GET' });
}

/**
 * Export som efterfrågas av itinerary-sidan.
 * Antag att API:et är /api/mock/itinerary?id=<id>.
 * (Justera gärna om ni har en annan rutt, t.ex. /api/mock/itinerary/[id])
 */
export async function getItinerary(id: string): Promise<Itinerary> {
  if (!id) throw new Error('getItinerary: id is required');

  const base = getBaseUrl();
  // Variant A: query-param
  const url = new URL('/api/mock/itinerary', base);
  url.searchParams.set('id', id);

  // // Variant B (om ni kör dynamic route):
  // const url = new URL(`/api/mock/itinerary/${encodeURIComponent(id)}`, base);

  return fetchJson<Itinerary>(url, { method: 'GET' });
}
