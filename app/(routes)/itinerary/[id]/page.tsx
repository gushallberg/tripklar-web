import SmartButtons from '@/components/SmartButtons';
import ItineraryTracker from '@/components/ItineraryTracker';
import { getItinerary } from '@/lib/api';

export default async function Page({ params, searchParams }: { params: { id: string }; searchParams: Record<string, string | undefined> }) {
  const data = await getItinerary(params.id);
  const scenario = searchParams.scenario;
  const city = searchParams.city;

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-4">
      <h1 className="text-3xl font-semibold">{data.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.images?.[0]?.url || 'https://picsum.photos/seed/archipelago/1200/600'}
        alt={data.images?.[0]?.alt || data.title}
        className="h-64 w-full rounded-2xl object-cover"
      />
      <p className="text-gray-700">{data.summary}</p>
      {data.paragraphs && (
        <section className="space-y-3 text-gray-700">
          {data.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      )}
      {data.steps && (
        <section aria-label="Steg-för-steg" className="space-y-2">
          <h2 className="text-xl font-semibold">Upplägg</h2>
          <ol className="list-decimal space-y-1 pl-6">
            {data.steps.map((s, i) => (
              <li key={i}>
                <span className="font-medium">{s.time ? `${s.time} ` : ''}</span>
                {s.text}
              </li>
            ))}
          </ol>
        </section>
      )}
      <SmartButtons itineraryId={data.itineraryId} scenario={scenario} deeplinks={data.deeplinks} />
      <ItineraryTracker scenario={scenario} city={city} />
    </main>
  );
}
