import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from '@store/store';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>,
)
