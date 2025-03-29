import {fireEvent, render, screen} from '@testing-library/react';
import wrapWithQueryClientProvider from '@hooks/renderWithQueryClientProvider.tsx';
import TableHeader from '@components/Table/TableHeader.tsx';
import {vi} from 'vitest';

describe('TableHeader Component', () => {

    it('handles sorting stars as ascending correctly', async () => {
        render(wrapWithQueryClientProvider(<TableHeader onSortChange={vi.fn()} sort={{sort:'stars', direction: 'asc'}} />));

        const starsSortButton = screen.getByTestId('stars-column-sort-button');
        fireEvent.click(starsSortButton);
        
        fireEvent.click(starsSortButton);
        const starsAscendingIcon = screen.getByTestId('stars-sorter-asc');
        expect(starsAscendingIcon).toBeInTheDocument();
    });

    it('handles sorting stars as descending correctly', async () => {
        render(wrapWithQueryClientProvider(<TableHeader onSortChange={vi.fn()} sort={{sort:'stars', direction: 'desc'}} />));

        const starsSortButton = screen.getByTestId('stars-column-sort-button');
        fireEvent.click(starsSortButton);

        fireEvent.click(starsSortButton);
        const starsDescendingIcon = screen.getByTestId('stars-sorter-desc');
        expect(starsDescendingIcon).toBeInTheDocument();
    });

    it('handles sorting forks as ascending correctly', async () => {
        render(wrapWithQueryClientProvider(<TableHeader onSortChange={vi.fn()} sort={{sort:'forks', direction: 'asc'}} />));

        const forksSortButton = screen.getByTestId('forks-column-sort-button');
        fireEvent.click(forksSortButton);
        
        fireEvent.click(forksSortButton);
        const forksAscendingIcon = screen.getByTestId('forks-sorter-asc');
        expect(forksAscendingIcon).toBeInTheDocument();
    });

    it('handles sorting forks as descending correctly', async () => {
        render(wrapWithQueryClientProvider(<TableHeader onSortChange={vi.fn()} sort={{sort:'forks', direction: 'desc'}} />));

        const forksSortButton = screen.getByTestId('forks-column-sort-button');
        fireEvent.click(forksSortButton);

        fireEvent.click(forksSortButton);
        const forksDescendingIcon = screen.getByTestId('forks-sorter-desc');
        expect(forksDescendingIcon).toBeInTheDocument();
    });

    it('handles sorting updated as ascending correctly', async () => {
        render(wrapWithQueryClientProvider(<TableHeader onSortChange={vi.fn()} sort={{sort:'updated', direction: 'asc'}} />));

        const updatedSortButton = screen.getByTestId('updated-column-sort-button');
        fireEvent.click(updatedSortButton);
        
        fireEvent.click(updatedSortButton);
        const updatedAscendingIcon = screen.getByTestId('updated-sorter-asc');
        expect(updatedAscendingIcon).toBeInTheDocument();
    });

    it('handles sorting updated as descending correctly', async () => {
        render(wrapWithQueryClientProvider(<TableHeader onSortChange={vi.fn()} sort={{sort:'updated', direction: 'desc'}} />));

        const updatedSortButton = screen.getByTestId('updated-column-sort-button');
        fireEvent.click(updatedSortButton);

        fireEvent.click(updatedSortButton);
        const updatedDescendingIcon = screen.getByTestId('updated-sorter-desc');
        expect(updatedDescendingIcon).toBeInTheDocument();
    });
});