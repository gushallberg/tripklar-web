import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.max(1, Math.min(3, Number(url.searchParams.get('limit') || 3)));
  const items = [
    {
      itineraryId: 'wk_3pQ2a7',
      title: 'Calm archipelago escape near Göteborg',
      summary: 'Start at the ferry, explore coastal paths, fika by the sea, return via late ferry.',
      heroImage: 'https://picsum.photos/seed/archipelago/1200/600',
      distanceKm: 72,
      priceHint: 'SEK 600–900',
      place: { placeId: 'pl_abc123', name: 'Vrångö', city: 'Göteborg', lat: 57.57, lon: 11.79 },
      deeplinks: {
        transportUrl: '/go/vasttrafik?target=...',
        lodgingUrl: '/go/booking?target=...',
        activityUrl: '/go/getyourguide?target=...'
      },
      isSponsored: false
    },
    {
      itineraryId: 'dt_q1Lm92',
      title: 'Forest lakes loop south of Älmhult',
      summary: 'Short drives, quiet paths, and a mid-day swim. Coffee at a local café.',
      heroImage: 'https://picsum.photos/seed/lake/1200/600',
      distanceKm: 38,
      priceHint: 'SEK 0–300',
      place: { placeId: 'pl_def456', name: 'Möckeln', city: 'Älmhult', lat: 56.55, lon: 14.13 },
      deeplinks: {
        transportUrl: '/go/googlemaps?target=...',
        lodgingUrl: '/go/booking?target=...',
        activityUrl: '/go/getyourguide?target=...'
      },
      isSponsored: true
    },
    {
      itineraryId: 'we_Z9p8cd',
      title: 'Design weekend in Småland glass country',
      summary: 'Kosta glassworks, nature strolls, and cozy dinner spots.',
      heroImage: 'https://picsum.photos/seed/glas/1200/600',
      distanceKm: 95,
      priceHint: 'SEK 900–1600',
      place: { placeId: 'pl_ghi789', name: 'Kosta', city: 'Lessebo', lat: 56.85, lon: 15.41 },
      deeplinks: {
        transportUrl: '/go/googlemaps?target=...',
        lodgingUrl: '/go/booking?target=...',
        activityUrl: '/go/getyourguide?target=...'
      },
      isSponsored: false
    }
  ].slice(0, limit);
  return NextResponse.json(items);
}
