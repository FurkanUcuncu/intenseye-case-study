import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import {BrowserRouter} from 'react-router-dom';

// Helper function to wrap components with QueryClientProvider
const wrapWithQueryClientProvider = (children: ReactNode) => {
    const queryClient = new QueryClient();
    return <BrowserRouter><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></BrowserRouter>;
};

export default wrapWithQueryClientProvider;
