export default function EmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="p-10 text-center text-gray-600">
      <div className="text-4xl" aria-hidden>
        🧭
      </div>
      <p className="mt-3">Inga förslag hittades. Justera filter och försök igen.</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 rounded-lg border px-3 py-1.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          Återställ filter
        </button>
      )}
    </div>
  );
}
