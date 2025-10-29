'use client';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

export default function ItineraryTracker({ scenario, city }: { scenario?: string; city?: string }) {
  useEffect(() => {
    const resolvedScenario = scenario || 'unknown';
    track('ItineraryView', { scenario: resolvedScenario, city: city || '' });
  }, [scenario, city]);
  return null;
}
