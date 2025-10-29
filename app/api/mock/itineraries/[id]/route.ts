import { NextResponse } from 'next/server';

const db: Record<string, any> = {
  wk_3pQ2a7: {
    itineraryId: 'wk_3pQ2a7',
    title: 'Calm archipelago escape near Göteborg',
    summary: 'A slow day among islands with easy trails and sea views.',
    paragraphs: [
      'Ride the morning ferry to Vrångö and start with a light coastal walk.',
      'Pack snacks or plan a fika stop by the harbor.'
    ],
    images: [{ url: 'https://picsum.photos/seed/archipelago/1200/600', alt: 'Sunlit archipelago shore' }],
    map: { lat: 57.57, lon: 11.79, zoom: 11 },
    steps: [
      { time: '09:20', text: 'Ferry from Saltholmen to Vrångö' },
      { time: '10:10', text: 'Coastal path loop (easy, ~4 km)' },
      { time: '12:30', text: 'Fika by the harbor' }
    ],
    deeplinks: {
      transportUrl: '/go/vasttrafik?target=...',
      lodgingUrl: '/go/booking?target=...',
      activityUrl: '/go/getyourguide?target=...'
    },
    pdfUrl: '#',
    icsUrl: '#'
  }
};

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const data = db[params.id] || null;
  return NextResponse.json(data, { status: data ? 200 : 404 });
}
