import {FILL_COLORS} from './constant';

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
    totalPages: number;
    isFetching: boolean;
    range?: number;
    jumpSize?: number;
}

export interface LanguageFilterProps {
    isFetching: boolean;
}

export interface SearchInputProps {
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

export type IProductSortingKind = 'title' | 'price' | 'rating' | 'stock' | '';

export interface IProductSort {
    sort: IProductSortingKind;
    direction: ISortingDirection;
}

export interface ProductSorterProps {
    sortColumn: IProductSortingKind;
    currentSort: IProductSort;
}

export interface ProductTableHeaderProps {
    onSortChange: (sort: IProductSortingKind) => void;
    sort: IProductSort
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: string;
}

export interface ProductTableBodyProps {
    isLoading: boolean;
    error: unknown;
    products: IProduct[];
}