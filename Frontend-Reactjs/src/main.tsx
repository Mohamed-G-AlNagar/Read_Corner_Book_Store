import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@fortawesome/fontawesome-free/css/all.min.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import TokenContextProvider from './context/TokenContext';
import UserContextProvider from './context/UserContext.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // ? the time that the data will stay in the cash till refetch it again
    },
  },
});

const toasterOptions = {
  success: {
    duration: 3000,
  },
  error: {
    duration: 5000,
  },
  style: {
    fontSize: '16px',
    maxWidth: '500px',
    padding: '16px 24px',
    backgroundColor: 'yellow',
    color: 'black',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <TokenContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={toasterOptions}
          />
        </QueryClientProvider>
      </UserContextProvider>
    </TokenContextProvider>
  </HelmetProvider>
)
