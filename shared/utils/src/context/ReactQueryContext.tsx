import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
type ReactQueryProviderType = {
  children: React.ReactNode;
};

export const ReactQueryProvider: React.FC<ReactQueryProviderType> = ({
  children,
}) => {
  // create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
