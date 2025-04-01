import React from 'react';
import tableStyles from '@styles/components/Table/Table.module.css';
import {IProduct, ProductTableBodyProps} from '@helpers/types';
import Loader from '@components/Loader/Loader';
import {AxiosError} from 'axios';

/**
 * ProductTableBody component that displays repository data in a table row format.
 * Handles loading, error, and empty state displays while rendering repository data.
 *
 * @param isLoading - Indicates whether the data is still loading.
 * @param error - Error object if data fetching fails.
 * @param repos - List of repositories to display in the table.
 *
 * @returns {JSX.Element} The table rows displaying repository data, or loading/error messages.
 */
const ProductTableBody = ({ isLoading, error, products }: ProductTableBodyProps): React.JSX.Element => {
    console.log('rendering table body');
    if (isLoading) {
        return (
            <tr>
                <td colSpan={100} className={tableStyles.loaderContainer}>
                    <Loader width={40} height={40} fill='blueGrey'/>
                </td>
            </tr>
        );
    }

    if (error) {
        const errorMessage = error instanceof AxiosError ? error?.response?.data?.message : 'An unknown error occurred';
        return (
            <tr>
                <td data-testid='table-fetch-error' colSpan={90} className={tableStyles.errorMessage}>
                    {errorMessage}
                </td>
            </tr>
        );
    }

    if (!products?.length) {
        return (
            <tr>
                <td data-testid='table-not-found' colSpan={100} className={tableStyles.emptyData}>
                    No products found
                </td>
            </tr>
        );
    }

    return (
        <>
            {products.map((product: IProduct) => (
                <tr data-testid={product.id} className={tableStyles.tRow} key={product.id}>
                    <td className={tableStyles.tData} data-cell="Id">{product.id}</td>
                    <td className={tableStyles.tData} data-cell="Title">{product.title}</td>
                    <td className={tableStyles.tData} data-cell="Description">{product.description}</td>
                    <td className={tableStyles.tData} data-cell="Price">{product.price}</td>
                    <td className={tableStyles.tData} data-cell="Rating">{product.rating}</td>
                    <td className={tableStyles.tData} data-cell="Stock">{product.stock}</td>
                </tr>
            ))}
        </>
    );
};

export default ProductTableBody;