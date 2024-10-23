import { useEffect, useState } from 'react';

/**
 * useOrigin Hook
 *
 * This custom React hook provides the current origin (protocol, hostname, and port) of the application.
 * It ensures that the origin is only returned after the component has mounted, preventing any issues
 * with server-side rendering.
 *
 * @returns {string} The current origin of the application, or an empty string if not mounted or running server-side.
 *
 * @example
 * import { useOrigin } from 'shared/utils/src/hooks/useOrigin';
 *
 * function MyComponent() {
 *   const origin = useOrigin();
 *   console.log(origin); // e.g., "https://example.com"
 *   return <div>Current origin: {origin}</div>;
 * }
 */

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  if (!mounted) {
    return '';
  }
  return origin;
};
