import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchInput from '@components/SearchInput/SearchInput.tsx';

describe('SearchInput Component', () => {
    it('renders correctly with initial props', () => {
        render(<SearchInput query="" onQueryChange={() => {}} isFetching={false} />);
        const input = screen.getByTestId('search-input');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveValue('');
        expect(input).not.toBeDisabled();
    });

    it('calls onQueryChange when typing', () => {
        const onQueryChangeMock = vi.fn();
        render(<SearchInput query="" onQueryChange={onQueryChangeMock} isFetching={false} />);

        const input = screen.getByTestId('search-input');
        fireEvent.change(input, { target: { value: 'react' } });

        expect(onQueryChangeMock).toHaveBeenCalledWith('react');
    });

    it('disables input when isFetching is true', () => {
        render(<SearchInput query="" onQueryChange={() => {}} isFetching={true} />);
        const input = screen.getByTestId('search-input');

        expect(input).toBeDisabled();
    });

    it('displays the correct initial query value', () => {
        render(<SearchInput query="initial query" onQueryChange={() => {}} isFetching={false} />);
        const input = screen.getByTestId('search-input');

        expect(input).toHaveValue('initial query');
    });
});
