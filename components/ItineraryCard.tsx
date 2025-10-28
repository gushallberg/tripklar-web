import Link from 'next/link';
import type { SuggestItem } from '@/lib/types';
import SponsorBadge from './SponsorBadge';
import SmartButtons from './SmartButtons';

export default function ItineraryCard(props: SuggestItem & { scenario?: string }) {
  const { itineraryId, title, summary, heroImage, distanceKm, priceHint, isSponsored, deeplinks, place } = props;
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative h-44 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage} alt={place?.name || title} className="h-full w-full object-cover" />
        {isSponsored && (
          <div className="absolute left-2 top-2">
            <SponsorBadge />
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <Link href={`/itinerary/${itineraryId}`} className="block">
          <h3 className="text-lg font-semibold leading-tight hover:underline">{title}</h3>
        </Link>
        <p className="line-clamp-3 text-sm text-gray-600">{summary}</p>
        <div className="flex flex-wrap gap-2 text-xs text-gray-700">
          {distanceKm !== undefined && <span className="rounded bg-gray-100 px-2 py-1">{distanceKm} km</span>}
          {priceHint && <span className="rounded bg-gray-100 px-2 py-1">{priceHint}</span>}
        </div>
        <SmartButtons itineraryId={itineraryId} scenario={props.scenario} deeplinks={deeplinks} />
      </div>
    </article>
  );
}
