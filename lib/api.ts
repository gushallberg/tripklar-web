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
  url?: string; // extern eller intern länk
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

/**
 * Bygger en bas-URL som funkar i SSR/CI och lokalt.
 * Tillåter värden som "https://tripklar.se/" och trimmar trailing slashar.
 */
export function getBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = env && env.length > 0 ? env : 'http://localhost:3000';
  return base.replace(/\/+$/, '');
}

/**
 * En tunn fetch-wrapper med timeout + bättre felmeddelanden.
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
      // Viktigt i SSR/CI när data inte ska cache:as mellan körningar
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
    // Gör fel tydliga i CI-loggar
    if (err?.name === 'AbortError') {
      throw new Error(`Fetch timeout after ${timeoutMs}ms for ${input}`);
    }
    throw err;
  } finally {
    clearTimeout(t);
  }
}

/**
 * Hämtar förslag från vår mock-endpoint.
 * Bygger alltid absolut URL för att undvika ERR_INVALID_URL i SSR/e2e.
 */
export async function getSuggest(params: SuggestParams): Promise<SuggestResponse> {
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
 * Exempel på fler helpers (framtidssäkert om ni lägger till riktiga API:er).
 * Avkommentera vid behov.
 */

// export async function getPlaceById(id: string) {
//   const base = getBaseUrl();
//   const url = new URL(`/api/places/${encodeURIComponent(id)}`, base);
//   return fetchJson<{ id: string; title: string; description?: string }>(url);
// }

// export async function searchTrips(query: string, limit = 10) {
//   const base = getBaseUrl();
//   const url = new URL('/api/trips/search', base);
//   url.searchParams.set('q', query);
//   url.searchParams.set('limit', String(limit));
//   return fetchJson<{ items: Array<{ id: string; title: string }> }>(url);
// }
