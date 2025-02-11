import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
import App from '../App.tsx';
import {vi} from 'vitest';
// import { BrowserRouter } from 'react-router-dom';
// import React from 'react'; // We will only use BrowserRouter once

// Custom wrapper to avoid nested <Router>
// const wrapWithRouter = (component: React.ReactNode) => {
//     return render(<BrowserRouter>{component}</BrowserRouter>);
// };

vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual('@tanstack/react-query');

    return {
        ...actual,
        useQuery: vi.fn(() => ({
            data: { total_count: 50, items: [] },
            isLoading: false,
            isFetching: false,
            error: null,
        })),
    };
});

describe('App Routing', () => {
    it('renders Dashboard component for root route', () => {
        render(<App />);

        expect(screen.getByTestId('dashboard-container')).toBeInTheDocument();
    });
});
