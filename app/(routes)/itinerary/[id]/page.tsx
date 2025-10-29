// app/(routes)/itinerary/[id]/page.tsx

import { Suspense } from 'react';
import type { Itinerary } from '@/lib/types';
import { getItinerary } from '@/lib/api';

type PageProps = {
  params: { id: string };
};

export const dynamic = 'force-dynamic'; // undvik cache i CI om ni vill

async function ItineraryContent({ id }: { id: string }) {
  const data: Itinerary = await getItinerary(id);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-2">{data.title}</h1>

      {data.description && (
        <p className="text-gray-700 mb-6">{data.description}</p>
      )}

      {Array.isArray(data.paragraphs) && data.paragraphs.length > 0 && (
        <section className="space-y-3 text-gray-700 mb-8">
          {data.paragraphs.map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      )}

      {Array.isArray(data.days) && data.days.length > 0 && (
        <section className="space-y-6">
          {data.days.map((day, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              {day.title && (
                <h2 className="text-xl font-medium mb-3">{day.title}</h2>
              )}
              {Array.isArray(day.stops) && day.stops.length > 0 ? (
                <ol className="list-decimal pl-5 space-y-2">
                  {day.stops.map((stop, i) => (
                    <li key={`${stop.id ?? i}-${i}`}>
                      <div className="font-medium">{stop.title ?? 'Stop'}</div>
                      {typeof stop.durationMinutes === 'number' && (
                        <div className="text-sm text-gray-500">
                          ~{stop.durationMinutes} min
                        </div>
                      )}
                      {stop.notes && (
                        <div className="text-gray-600">{stop.notes}</div>
                      )}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500">Inga stopp definierade.</p>
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default async function Page({ params }: PageProps) {
  const id = params?.id;

  return (
    <Suspense fallback={<div className="p-8">Laddar färdplan…</div>}>
      <ItineraryContent id={id} />
    </Suspense>
  );
}
