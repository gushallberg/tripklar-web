import Link from 'next/link';
import type { Deeplinks } from '@/lib/types';
import { track } from '@/lib/analytics';

export default function SmartButtons({ itineraryId, scenario, deeplinks }: { itineraryId?: string; scenario?: string; deeplinks?: Deeplinks }) {
  const items = [
    { label: 'Transport', href: deeplinks?.transportUrl || '#', partner: 'transport' },
    { label: 'Boende', href: deeplinks?.lodgingUrl || '#', partner: 'lodging' },
    { label: 'Aktivitet', href: deeplinks?.activityUrl || '#', partner: 'activity' }
  ];
  return (
    <div className="flex gap-2 pt-2">
      {items.map((i) => (
        <Link
          key={i.label}
          href={i.href}
          className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/20"
          onClick={() => track('GoClick', { partner: i.partner, itineraryId: itineraryId || '', scenario: scenario || '' })}
        >
          {i.label}
        </Link>
      ))}
    </div>
  );
}
