'use client';
import { useState } from 'react';

type Filters = { city?: string; date?: string; radiusKm?: string | number; tags?: string };

export default function FiltersBar({ onApply, initialFilters }: { onApply: (f: Record<string, string>) => void; initialFilters?: Filters }) {
  const [city, setCity] = useState(initialFilters?.city ?? 'almhult');
  const [date, setDate] = useState(initialFilters?.date ?? '');
  const [radiusKm, setRadiusKm] = useState(Number(initialFilters?.radiusKm ?? 100));
  const [tags, setTags] = useState<string>(initialFilters?.tags ?? 'nature,food');

  return (
    <form
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      onSubmit={(e) => {
        e.preventDefault();
        onApply({ city, date, radiusKm: String(radiusKm), tags });
      }}
    >
      <label className="flex flex-col text-sm font-medium text-gray-600">
        Stad
        <input
          className="mt-1 rounded-lg border px-3 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Stad"
          aria-label="Stad"
        />
      </label>
      <label className="flex flex-col text-sm font-medium text-gray-600">
        Datum
        <input
          className="mt-1 rounded-lg border px-3 py-2"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Datum"
        />
      </label>
      <label className="flex flex-col text-sm font-medium text-gray-600">
        Radie (km)
        <input
          className="mt-1 w-full"
          type="range"
          min={20}
          max={250}
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          aria-label="Radie (km)"
        />
        <span className="mt-1 text-xs text-gray-500" aria-live="polite">
          {radiusKm} km
        </span>
      </label>
      <label className="flex flex-col text-sm font-medium text-gray-600">
        Taggar
        <input
          className="mt-1 rounded-lg border px-3 py-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="t.ex. nature,food"
          aria-label="Taggar"
        />
      </label>
      <button className="col-span-2 rounded-lg border bg-white px-3 py-2 font-medium hover:bg-gray-50 sm:col-span-4" type="submit">
        Visa förslag
      </button>
    </form>
  );
}
