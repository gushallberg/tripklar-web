'use client';
import FiltersBar from '@/components/FiltersBar';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-indigo-500">Beta</p>
        <h1 className="text-3xl font-semibold">Tripklar</h1>
        <p className="text-gray-600">2–3 smarta micro-resor utifrån stad, datum, radie och intressen.</p>
      </header>

      <section aria-label="Filtrera förslag" className="rounded-2xl border bg-white p-4 shadow-sm">
        <FiltersBar
          onApply={(f) => {
            const qs = new URLSearchParams({ scenario: 'daytrip', ...f }).toString();
            window.location.href = `/daytrip?${qs}`;
          }}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Utforska scenarier">
        {['daytrip', 'weekend', 'workation'].map((s) => (
          <Link
            key={s}
            href={`/${s}`}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold capitalize">{s}</h2>
            <p className="mt-1 text-sm text-gray-600">Få 2–3 handplockade förslag.</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
