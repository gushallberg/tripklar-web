import ItineraryCard from '@/components/ItineraryCard';
import EmptyState from '@/components/EmptyState';
import SuggestTracker from '@/components/SuggestTracker';
import { getSuggest } from '@/lib/api';
import type { SuggestItem } from '@/lib/types';

export default async function Page({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const scenario = 'daytrip';
  const params = {
    scenario,
    city: searchParams.city || 'almhult',
    date: searchParams.date || '',
    radiusKm: searchParams.radiusKm || '150',
    tags: searchParams.tags || 'nature,food',
    limit: '3'
  };
  const items = (await getSuggest(params)) as SuggestItem[];
  const count = items?.length || 0;

  return (
    <main className="mx-auto max-w-5xl space-y-4 p-4">
      <h1 className="text-2xl font-semibold">Dagsturer</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {!count ? (
          <EmptyState />
        ) : (
          items.map((x) => <ItineraryCard key={x.itineraryId} {...x} scenario={scenario} />)
        )}
      </div>
      <SuggestTracker scenario={scenario} city={params.city} radiusKm={params.radiusKm} count={count} />
    </main>
  );
}
