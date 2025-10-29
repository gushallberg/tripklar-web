// lib/api.ts

import type {
  SuggestParams,
  SuggestItem,
  SuggestResponse,
  Itinerary,
} from '@/lib/types';

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
 * Hämtar förslag som LISTA (matchar daytrip/page.tsx som förväntar SuggestItem[]).
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
  return Array.isArray(data?.items) ? (data.items as SuggestItem[]) : [];
}

/**
 * Alternativ helper om ni vill komma åt metadata också.
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
 * Export som itinerary-sidan importerar.
 * Standardiserat till /api/mock/itinerary?id=<id>
 * (byt till path-param om ni använder /api/mock/itinerary/[id])
 */
export async function getItinerary(id: string): Promise<Itinerary> {
  if (!id) throw new Error('getItinerary: id is required');

  const base = getBaseUrl();
  const url = new URL('/api/mock/itinerary', base);
  url.searchParams.set('id', id);

  return fetchJson<Itinerary>(url, { method: 'GET' });
}

// Valfritt: re-exportera typer om ni vill kunna importera från '@/lib/api'
export type {
  SuggestParams,
  SuggestItem,
  SuggestResponse,
  Itinerary,
} from '@/lib/types';
