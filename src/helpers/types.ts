import {FILL_COLORS} from './constant.ts';

export interface IRepo {
    id: string;
    owner: {
        login: string;
    };

    description: string;
    stargazers_count: number;
    forks: number;
    updated_at: Date;
    total_pages: number;
}

export type ISortingKind = 'stars' | 'forks' | 'updated' | '';

export type ISortingDirection = 'asc' | 'desc';

export interface ISort {
    sort: ISortingKind;
    direction: ISortingDirection;
}

export interface TableHeaderProps {
    onSortChange: (sort: ISortingKind) => void;
    sort: ISort
}

export interface TableBodyProps {
    isLoading: boolean;
    error: unknown;
    repos: IRepository[];
}

export interface SorterProps {
    sortColumn: ISortingKind;
    currentSort: ISort;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    isFetching: boolean;
    onPageChange: (newPage: number) => void;
    range?: number; // Number of pages between current and jump Page
    jumpSize?: number;
}

export interface LanguageFilterProps {
    selectedLanguage: string;
    isFetching: boolean;
    onLanguageChange: (lang: string) => void;
}

export interface SearchInputProps {
    query: string;
    onQueryChange: (value: string) => void;
    isFetching: boolean;
}

export interface LoaderProps {
    width: number;
    height: number;
    fill: keyof typeof FILL_COLORS;
}

export interface IRepository {
    id: number;
    name: string;
    owner: {
        login: string;
    };
    description: string;
    stargazers_count: number;
    forks: number;
    updated_at: string;
}

export interface IApiResponse {
    items: IRepository[];
    total_count: number;
    incomplete_results: boolean;
}