import { useEffect, useState } from 'react';

interface ChatScrollProps {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
}

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  // initialization state
  const [hasInitialized, setHasInitialized] = useState(false);

  // effect to load previous messages
  useEffect(() => {
    if (chatRef.current === null) return;

    const topDiv = chatRef.current;

    // function to load previous message when scrolled to top
    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      // if immediately scrolled to top, load messages
      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    // attaching listener to top div
    topDiv?.addEventListener('scroll', handleScroll);

    return () => {
      topDiv?.removeEventListener('scroll', handleScroll);
    };
  }, [shouldLoadMore, loadMore, chatRef]);

  // effect to scroll to bottom when new message is added
  useEffect(() => {
    const bottomDiv = bottomRef.current;
    const topDiv = chatRef.current;

    // function to return boolean to scroll automatically when new message is sent
    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDiv) {
        return false;
      }

      // if user scroll up, dont interrupt
      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [bottomRef, chatRef, count, hasInitialized]);
};
