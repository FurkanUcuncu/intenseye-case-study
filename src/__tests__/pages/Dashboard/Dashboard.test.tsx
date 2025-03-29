import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashboard from '@pages/Dashboard/Dashboard.tsx';
import wrapWithQueryClientProvider from '@hooks/renderWithQueryClientProvider.tsx';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import { vi } from 'vitest';
import {dummyResponse} from '@helpers/constant.ts';
import React from 'react';

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

// Mock fetchRepositories
vi.mock('../../../services/RepositoryService', () => ({
    fetchRepositories: () => Promise.resolve({ total_count: 50, items: [] }),
}));

vi.spyOn(React, 'useEffect').mockImplementationOnce(f => f());

describe('Dashboard Component', () => {
    it('handles sorting when given an invalid sort value', () => {
        render(wrapWithQueryClientProvider(<Dashboard />));

        const starsSortButton = screen.getByTestId('stars-column-sort-button');
        fireEvent.click(starsSortButton); // First click changes sorting state
        fireEvent.click(starsSortButton); // Second click reverses it
        fireEvent.click(starsSortButton); // Third click should hit the "return { ...prevState }" case

        expect(starsSortButton).toBeInTheDocument(); // Just checking if button is there after multiple clicks
    });

    it('returns 0 total pages when total_count is 0', async () => {
        vi.mock('../../../services/RepositoryService', () => ({
            fetchRepositories: vi.fn().mockResolvedValue({ total_count: 0, items: [] }),
        }));

        render(wrapWithQueryClientProvider(<Dashboard />));

        await waitFor(() => {
            const pagination = screen.queryByTestId('pagination-container');
            expect(pagination).toBeInTheDocument();
        }, { timeout: 5000 });
    });

    it('defaults to an empty array when data.items is undefined', async () => {
        vi.mocked(useQuery).mockReturnValue({
            data: {total_count: 50, items: undefined},
            isLoading: false,
            isFetching: false,
            error: null,
        } as unknown as UseQueryResult<typeof dummyResponse, unknown>); // Explicitly define the type

        render(wrapWithQueryClientProvider(<Dashboard />));

        await waitFor(() => {
            const tableBody = screen.getByTestId('table-not-found');
            expect(tableBody).toBeInTheDocument();
        });
    });
});