import { Box } from '@social-media/evoke-ui';
import React, { useCallback, useRef } from 'react';

interface InfiniteScrollListProps {
  items: React.ReactNode[];
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const InfiniteScrollList: React.FC<InfiniteScrollListProps> = ({
  items,
  loadMore,
  isLoading,
  hasMore,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore]
  );
  return (
    <Box className="infinite-scroll-list flex flex-col-reverse">
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <div ref={lastItemRef} key={index}>
              {item}
            </div>
          );
        }
        return <div key={index}>{item}</div>;
      })}
      {isLoading && <p>Loading more...</p>}
    </Box>
  );
};

export default InfiniteScrollList;
