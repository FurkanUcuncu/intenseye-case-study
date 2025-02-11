import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../../components/Table/Pagination';

describe('Pagination Component', () => {
    const onPageChangeMock = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly when totalPages > 1', () => {
        render(<Pagination currentPage={1} totalPages={5} isFetching={false} onPageChange={onPageChangeMock} />);
        expect(screen.getByTestId('pagination-prev-button')).toBeInTheDocument();
        expect(screen.getByTestId('pagination-next-button')).toBeInTheDocument();
    });

    it('does not render when totalPages <= 1', () => {
        render(<Pagination currentPage={1} totalPages={1} isFetching={false} onPageChange={onPageChangeMock} />);
        expect(screen.queryByTestId('pagination-prev-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('pagination-next-button')).not.toBeInTheDocument();
    });

    it('disables previous button on first page', () => {
        render(<Pagination currentPage={1} totalPages={5} isFetching={false} onPageChange={onPageChangeMock} />);
        expect(screen.getByTestId('pagination-prev-button')).toBeDisabled();
    });

    it('disables next button on last page', () => {
        render(<Pagination currentPage={5} totalPages={5} isFetching={false} onPageChange={onPageChangeMock} />);
        expect(screen.getByTestId('pagination-next-button')).toBeDisabled();
    });

    it('calls onPageChange when clicking a page number', () => {
        render(<Pagination currentPage={2} totalPages={5} isFetching={false} onPageChange={onPageChangeMock} />);
        const pageButton = screen.getByText('3');
        fireEvent.click(pageButton);
        expect(onPageChangeMock).toHaveBeenCalledWith(3);
    });

    it('calls onPageChange when clicking previous button', () => {
        render(<Pagination currentPage={3} totalPages={5} isFetching={false} onPageChange={onPageChangeMock} />);
        const prevButton = screen.getByTestId('pagination-prev-button');
        fireEvent.click(prevButton);
        expect(onPageChangeMock).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when clicking next button', () => {
        render(<Pagination currentPage={3} totalPages={5} isFetching={false} onPageChange={onPageChangeMock} />);
        const nextButton = screen.getByTestId('pagination-next-button');
        fireEvent.click(nextButton);
        expect(onPageChangeMock).toHaveBeenCalledWith(4);
    });

    it('handles page jumps correctly', () => {
        render(<Pagination currentPage={5} totalPages={20} isFetching={false} onPageChange={onPageChangeMock} />);

        // Find page jump button
        const pageJumpButtons = screen.getAllByText('...');
        expect(pageJumpButtons.length).toBeGreaterThan(0);

        // Click first page jump (assumed left)
        fireEvent.click(pageJumpButtons[0]);
        expect(onPageChangeMock).toHaveBeenCalledWith(1); // Jump left

        // Click second page jump (assumed right)
        fireEvent.click(pageJumpButtons[1]);
        expect(onPageChangeMock).toHaveBeenCalledWith(10); // Jump right
    });
});
