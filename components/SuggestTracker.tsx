'use client';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

export default function SuggestTracker({ scenario, city, radiusKm, count }: { scenario: string; city: string; radiusKm: string; count: number }) {
  useEffect(() => {
    track('SuggestView', { scenario, city, radiusKm, count });
  }, [scenario, city, radiusKm, count]);
  return null;
}
