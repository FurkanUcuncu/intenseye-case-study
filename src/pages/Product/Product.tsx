import React, {useCallback} from 'react';
import {IProductSort} from '@helpers/types';
import dashboardStyles from '@styles/pages/Dashboard/Dashboard.module.css';
import tableStyles from '@styles/components/Table/Table.module.css';
import SearchInput from '@components/SearchInput/SearchInput';
import ProductTableHeader from '@components/Table/ProductTableHeader';
import ProductTableBody from '@components/Table/ProductTableBody';
import Pagination from '@components/Table/Pagination';
import {RootState} from '@store/store';
import {useAppDispatch, useAppSelector} from '@hooks/ReduxCall';
import {setSort} from '@store/product/productSlice';
import {useGetProductsQuery} from '@store/services/productService.ts';

/**
 * Product component that displays repositories with sorting, filtering, and pagination options.
 * It fetches repository data from an API based on user input for query, language, and sorting.
 * @returns JSX element rendering the dashboard UI.
 */
const Product: React.FC = () => {
    const dispatch = useAppDispatch();
    // Selectors from Redux store
    const {query, sort, currentPage} = useAppSelector((state: RootState) => state?.product);

    /**
     * React Query hook to fetch repository data from the API based on the current query, language, sorting, and page.
     */
    const { data, isLoading, isFetching, error } = useGetProductsQuery(
        { query, sort, currentPage },
        {
            selectFromResult: ({ data, isLoading, isFetching, error }) => ({
                data,
                isLoading,
                isFetching,
                error,
            }),
        }
    );

    /**
     * Handle sorting when user clicks on sort buttons.
     * This updates the sort state
     * @param sort - The value for the sorting parameter (e.g., 'title').
     */
    const handleSorting = useCallback((sortType: string) => {
        dispatch(setSort({
            sort: sortType,
            direction: sort.direction === 'asc' ? 'desc' : 'asc',
        } as IProductSort));
    }, [dispatch, sort]);

    /**
     * Calculates the total number of pages based on the total count of repositories.
     * @returns The number of pages needed for pagination.
     */
    const totalPages = data?.total ? Math.ceil(data.total / 10) : 0;

    return (
        <div data-testid='dashboard-container' className={dashboardStyles.container}>
            <div className={dashboardStyles.searchContainer}>
                <SearchInput isFetching={isFetching} />
            </div>
            <div className={dashboardStyles.tableWrapper}>
                <table className={tableStyles.table}>
                    <ProductTableHeader sort={sort} onSortChange={handleSorting} />
                    <tbody data-testid='table-body'>
                        <ProductTableBody isLoading={isLoading || isFetching} error={error} products={data?.products || []} />
                    </tbody>
                </table>
            </div>
            <Pagination
                totalPages={totalPages}
                isFetching={isFetching}
                range={2}
                jumpSize={10}
            />
        </div>
    );
};

export default Product;