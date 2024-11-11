import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  onReachBottom: () => void,
  options = {
    threshold: 0.8,
    rootMargin: '100px',
  }
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        onReachBottom();
      }
    },
    [onReachBottom]
  );

  useEffect(() => {
    if (!targetRef.current) return;

    observerRef.current = new IntersectionObserver(callback, {
      threshold: options.threshold,
      rootMargin: options.rootMargin,
    });

    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options.threshold, options.rootMargin]);

  return targetRef;
};
