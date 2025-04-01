import React from 'react';
import tableStyles from '@styles/components/Table/Table.module.css';
import sorterStyles from '@styles/components/Table/Sorter.module.css';
import ProductSorter from '@components/Table/ProductSorter';
import {ProductTableHeaderProps} from '@helpers/types';

/**
 * ProductTableHeader component renders the table header row with sorting functionality for columns.
 * It includes sortable columns for "Stars", "Forks", and "Last Update" with the ability to handle sort state changes.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSortChange - Callback function to handle sorting change. It accepts the sort column as an argument.
 * @param {Object} props.sort - Current sorting state, including the column to be sorted and the direction.
 *
 * @returns {JSX.Element} The header row of the table with sorting controls for the columns.
 */
const ProductTableHeader = ({ onSortChange, sort }: ProductTableHeaderProps): React.JSX.Element => {
    console.log('rendering table header');
    return (
        <thead>
        <tr className={tableStyles.tRow}>
            <th className={tableStyles.tHead}>ID</th>
            <th data-testid='title-column-sort-button' className={tableStyles.tHead} onClick={() => onSortChange('title')}>
                <div className={sorterStyles.sorterWrapper}>Title <ProductSorter sortColumn="title" currentSort={sort}/></div>
            </th>
            <th className={tableStyles.tHead}>Description</th>
            <th data-testid='price-column-sort-button' className={tableStyles.tHead} onClick={() => onSortChange('price')}>
                <div className={sorterStyles.sorterWrapper}>Price <ProductSorter sortColumn="price" currentSort={sort}/></div>
            </th>
            <th data-testid='rating-column-sort-button' className={tableStyles.tHead} onClick={() => onSortChange('rating')}>
                <div className={sorterStyles.sorterWrapper}>Rating<ProductSorter sortColumn="rating" currentSort={sort}/></div>
            </th>
            <th data-testid='stock-column-sort-button' className={tableStyles.tHead} onClick={() => onSortChange('stock')}>
                <div className={sorterStyles.sorterWrapper}>Stock<ProductSorter sortColumn="stock" currentSort={sort}/></div>
            </th>
        </tr>
        </thead>
    );
};

export default ProductTableHeader;