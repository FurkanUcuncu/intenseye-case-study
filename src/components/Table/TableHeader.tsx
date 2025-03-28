import React from 'react';
import tableStyles from '../../assets/styles/components/Table/Table.module.css';
import sorterStyles from '../../assets/styles/components/Table/Sorter.module.css';
import Sorter from '../../components/Table/Sorter.tsx';
import {TableHeaderProps} from '../../helpers/types';

/**
 * TableHeader component renders the table header row with sorting functionality for columns.
 * It includes sortable columns for "Stars", "Forks", and "Last Update" with the ability to handle sort state changes.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSortChange - Callback function to handle sorting change. It accepts the sort column as an argument.
 * @param {Object} props.sort - Current sorting state, including the column to be sorted and the direction.
 *
 * @returns {JSX.Element} The header row of the table with sorting controls for the columns.
 */
const TableHeader = ({ onSortChange, sort }: TableHeaderProps): React.JSX.Element => {
    console.log('rendering table header');
    return (
        <thead>
            <tr className={tableStyles.tRow}>
                <th className={tableStyles.tHead}>ID</th>
                <th className={tableStyles.tHead}>Username</th>
                <th className={tableStyles.tHead}>Description</th>
                <th data-testid='stars-column-sort-button' className={tableStyles.tHead} onClick={() => onSortChange('stars')}>
                    <div className={sorterStyles.sorterWrapper}>Stars <Sorter sortColumn="stars" currentSort={sort}/></div>
                </th>
                <th data-testid='forks-column-sort-button' className={tableStyles.tHead} onClick={() => onSortChange('forks')}>
                    <div className={sorterStyles.sorterWrapper}>Forks<Sorter sortColumn="forks" currentSort={sort}/></div>
                </th>
                <th data-testid='updated-column-sort-button' className={tableStyles.tHead} onClick={() => onSortChange('updated')}>
                    <div className={sorterStyles.sorterWrapper}>Last Update<Sorter sortColumn="updated" currentSort={sort}/></div> 
                </th>
            </tr>
        </thead>
    );
};

export default TableHeader;