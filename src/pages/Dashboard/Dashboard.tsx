import React, {useCallback} from 'react';
import { ISort } from '@helpers/types';
import dashboardStyles from '@styles/pages/Dashboard/Dashboard.module.css';
import tableStyles from '@styles/components/Table/Table.module.css';
import SearchInput from '@components/SearchInput/SearchInput';
import LanguageFilter from '@components/Table/LanguageFilter';
import TableHeader from '@components/Table/TableHeader';
import TableBody from '@components/Table/TableBody';
import Pagination from '@components/Table/Pagination';
import {RootState} from '@store/store';
import {useAppDispatch, useAppSelector} from '@hooks/ReduxCall';
import {setSort} from '@store/query/querySlice';
import {useGetRepositoriesQuery} from '@store/services/repositoryService';

/**
 * Dashboard component that displays repositories with sorting, filtering, and pagination options.
 * It fetches repository data from an API based on user input for query, language, and sorting.
 * @returns JSX element rendering the dashboard UI.
 */
const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    // Selectors from Redux store
    const {query, sort, currentPage, language} = useAppSelector((state: RootState) => state?.query);

    /**
     * React Query hook to fetch repository data from the API based on the current query, language, sorting, and page.
     */
    const { data, isLoading, isFetching, error, refetch } = useGetRepositoriesQuery(
        { query, sort, currentPage, language },
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
     * @param sort - The value for the sorting parameter (e.g., 'stars').
     */
    const handleSorting = useCallback((sortType: string) => {
        dispatch(setSort({
            sort: sortType,
            direction: sort.direction === 'asc' ? 'desc' : 'asc',
        } as ISort));
        refetch();
    }, [dispatch, sort]);
    
    /**
     * Calculates the total number of pages based on the total count of repositories.
     * @returns The number of pages needed for pagination.
     */
    const totalPages = data?.total_count ? Math.ceil(data.total_count / 10) : 0;
    
    return (
        <div data-testid='dashboard-container' className={dashboardStyles.container}>
            <div className={dashboardStyles.searchContainer}>
                <SearchInput isFetching={isFetching} />
                <LanguageFilter isFetching={isFetching} />
            </div>
            <div className={dashboardStyles.tableWrapper}>
                <table className={tableStyles.table}>
                    <TableHeader sort={sort} onSortChange={handleSorting} />
                    <tbody data-testid='table-body'>
                        <TableBody isLoading={isLoading || isFetching} error={error} repos={data?.items || []} />
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

export default Dashboard;