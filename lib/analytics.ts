export function track(event: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  try {
    (window as any).plausible?.(event, { props });
  } catch {}
  try {
    (window as any).gtag?.('event', event, props || {});
  } catch {}
}
