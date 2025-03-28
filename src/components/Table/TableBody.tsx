import React from 'react';
import tableStyles from '../../assets/styles/components/Table/Table.module.css';
import {IRepository, TableBodyProps} from '../../helpers/types';
import Loader from '../../components/Loader/Loader';
import {AxiosError} from 'axios';

/**
 * TableBody component that displays repository data in a table row format.
 * Handles loading, error, and empty state displays while rendering repository data.
 *
 * @param isLoading - Indicates whether the data is still loading.
 * @param error - Error object if data fetching fails.
 * @param repos - List of repositories to display in the table.
 *
 * @returns {JSX.Element} The table rows displaying repository data, or loading/error messages.
 */
const TableBody = ({ isLoading, error, repos }: TableBodyProps): React.JSX.Element => {
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

    if (!repos?.length) {
        return (
            <tr>
                <td data-testid='table-not-found' colSpan={100} className={tableStyles.emptyData}>
                    No repositories found
                </td>
            </tr>
        );
    }

    return (
        <>
            {repos.map((repo: IRepository) => (
                <tr data-testid={repo.id} className={tableStyles.tRow} key={repo.id}>
                    <td className={tableStyles.tData} data-cell="ID">{repo.id}</td>
                    <td className={tableStyles.tData} data-cell="Username">{repo.owner.login}</td>
                    <td className={tableStyles.tData} data-cell="Description">{repo.description}</td>
                    <td className={tableStyles.tData} data-cell="Stars">{repo.stargazers_count}</td>
                    <td className={tableStyles.tData} data-cell="Forks">{repo.forks}</td>
                    <td className={tableStyles.tData} data-cell="Updated">{new Date(repo.updated_at).toLocaleDateString()}</td>
                </tr>
            ))}
        </>
    );
};

export default TableBody;