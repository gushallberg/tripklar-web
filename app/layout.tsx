import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tripklar',
  description: 'Planera mikro-resor i Sverige med Tripklar.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 p-4">
              <Link href="/" className="text-xl font-semibold">
                Tripklar
              </Link>
              <nav className="flex gap-4 text-sm text-gray-600">
                <Link href="/daytrip" className="hover:text-gray-900">
                  Dagsturer
                </Link>
                <Link href="/weekend" className="hover:text-gray-900">
                  Helger
                </Link>
                <Link href="/workation" className="hover:text-gray-900">
                  Workations
                </Link>
                <Link href="/transparency" className="hover:text-gray-900">
                  Transparens
                </Link>
                <Link href="/privacy" className="hover:text-gray-900">
                  Integritet
                </Link>
              </nav>
            </div>
          </header>
          <div className="flex-1">{children}</div>
          <footer className="border-t bg-white/70">
            <div className="mx-auto max-w-5xl p-4 text-xs text-gray-500">
              © {new Date().getFullYear()} Tripklar. Alla rättigheter förbehållna.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
