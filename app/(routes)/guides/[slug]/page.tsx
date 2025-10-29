import { notFound } from 'next/navigation';

const guides: Record<string, { title: string; body: string }> = {
  packing: {
    title: 'Packlista för mikroresor',
    body: 'En kort guide kommer här när redaktionen är redo. Under tiden – res lätt, tänk lager på lager och glöm inte vattenflaskan.'
  }
};

export default function Page({ params }: { params: { slug: string } }) {
  const guide = guides[params.slug];
  if (!guide) return notFound();
  return (
    <main className="mx-auto max-w-3xl space-y-4 p-4">
      <h1 className="text-2xl font-semibold">{guide.title}</h1>
      <p className="text-gray-700">{guide.body}</p>
    </main>
  );
}
