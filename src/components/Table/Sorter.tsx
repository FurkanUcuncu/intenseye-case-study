import sorterStyles from '@styles/components/Table/Sorter.module.css'
import React from 'react';
import {SorterProps} from '@helpers/types';

/**
 * Sorter component that displays a sorting indicator based on the current sort direction.
 * It only renders if the `currentSort.sort` matches the `sortColumn` prop.
 *
 * @param {Object} props - Component props.
 * @param {ISortingKind} props.sortColumn - The column that the sorting is applied to.
 * @param {ISort} props.currentSort - The current sorting state containing the column and direction.
 *
 * @returns {JSX.Element | null} The sorting indicator for the column, or null if the column is not being sorted.
 */
const Sorter = ({sortColumn, currentSort}: SorterProps): React.JSX.Element | null=> {
    if (currentSort.sort !== sortColumn) return null;
    
    return (
        <div className={sorterStyles.sorterContainer}>
            {currentSort.direction === 'asc' ? (
                <div data-testid={`${sortColumn}-sorter-asc`} className={sorterStyles.ascSorter} />
            ) : (
                <div data-testid={`${sortColumn}-sorter-desc`} className={sorterStyles.descSorter} />
            )}
        </div>
    );
}

export default Sorter;