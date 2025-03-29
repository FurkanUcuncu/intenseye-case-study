import React from 'react';
import paginationStyles from '@styles/components/Table/Pagination.module.css';
import clsx from 'clsx';
import {PaginationProps} from '@helpers/types';
import {useAppDispatch, useAppSelector} from '@hooks/ReduxCall';
import {setCurrentPage} from '@store/query/querySlice';
/**
 * Pagination component that allows navigating through pages with next, previous, and page number buttons.
 * It supports dynamic page numbers with jump page button
 *
 * @param {Object} props - Component props.
 * @param {number} props.totalPages - Total number of pages available.
 * @param {boolean} props.isFetching - Loading state for disabling buttons.
 * @param {number} [props.range=2] - Number of pages to show before jumpPage (default is 2).
 * @param {number} [props.jumpSize=5] - Number of pages to jump when clicking jumpPage button (default is 5).
 *
 * @returns {React.JSX.Element} The Pagination component.
 */
const Pagination = ({
    totalPages, 
    isFetching,
    range = 2, // Default to 2 pages before showing jumpPage button
    jumpSize = 5, // Jump by 5 pages when clicking '...'
}: PaginationProps): React.JSX.Element | null => {
    const dispatch = useAppDispatch();
    const {currentPage} = useAppSelector(state => state?.query);
    console.log('rendering pagination');
    if (totalPages <= 1) return null; // Hide pagination if only 1 page

    const onPageChange = (currentPage: number) => {
        dispatch(setCurrentPage(currentPage));
    }
    
    const getPageNumbers = () => {
        const pages: (number | '...')[] = [];

        const addPage = (_page: number) => {
            if (!pages.includes(_page)) pages.push(_page);
        };

        addPage(1); // First page

        if (currentPage - range > 2) pages.push('...');

        for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
            addPage(i);
        }

        if (currentPage + range < totalPages - 1) pages.push('...');

        addPage(totalPages); // Last page

        return pages;
    };

    const handlePageJump = (position: 'left' | 'right') => {
        const targetPage = position === 'left' ? Math.max(1, currentPage - jumpSize) : Math.min(totalPages, currentPage + jumpSize);
        onPageChange(targetPage);
    };
    
    return (
        <div data-testid='pagination-container' className={paginationStyles.pagination}>
            <button
                data-testid='pagination-prev-button'
                className={paginationStyles.paginationButton}
                disabled={currentPage === 1 || isFetching}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>
            {getPageNumbers().map((_page, index) =>
                _page === '...' ? (
                    <button
                        key={`jump-page-${index}`}
                        disabled={isFetching}
                        className={clsx(paginationStyles.paginationButton)}
                        onClick={() => handlePageJump(index === 1 ? 'left' : 'right')}
                        onMouseEnter={(e) => (e.currentTarget.innerHTML = index === 1 ? `<` : `>`) }
                        onMouseLeave={(e) => (e.currentTarget.innerHTML = '...')}
                    >
                        ...
                    </button>
                ) : (
                    <button
                        key={_page}
                        disabled={isFetching}
                        className={clsx(paginationStyles.paginationButton, { [paginationStyles.activePage]: _page === currentPage })}
                        onClick={() => onPageChange(_page)}
                    >
                        {_page}
                    </button>
                )
            )}
            <button
                data-testid='pagination-next-button'
                className={paginationStyles.paginationButton}
                disabled={currentPage >= totalPages || isFetching}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;