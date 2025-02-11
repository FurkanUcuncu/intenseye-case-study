import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LanguageFilter from '../../../components/Table/LanguageFilter';

const mockOnLanguageChange = vi.fn();

describe('LanguageFilter Component', () => {
    const languages = ['JavaScript', 'Python', 'Scala'];

    it('renders all language options', () => {
        render(
            <LanguageFilter
                selectedLanguage="JavaScript"
                isFetching={false}
                onLanguageChange={mockOnLanguageChange}
            />
        );

        languages.forEach((lang) => {
            expect(screen.getByTestId(`language-filter-${lang}`)).toBeInTheDocument();
            expect(screen.getByText(lang)).toBeInTheDocument();
        });
    });

    it('displays the correct selected language', () => {
        render(
            <LanguageFilter
                selectedLanguage="Python"
                isFetching={false}
                onLanguageChange={mockOnLanguageChange}
            />
        );

        const selectedInput = screen.getByTestId('language-filter-Python') as HTMLInputElement;
        expect(selectedInput.checked).toBe(true);
    });

    it('calls onLanguageChange when a new language is selected', () => {
        render(
            <LanguageFilter
                selectedLanguage="JavaScript"
                isFetching={false}
                onLanguageChange={mockOnLanguageChange}
            />
        );

        const pythonInput = screen.getByTestId('language-filter-Python');
        fireEvent.click(pythonInput);

        expect(mockOnLanguageChange).toHaveBeenCalledWith('Python');
    });

    it('disables inputs when isFetching is true', () => {
        render(
            <LanguageFilter
                selectedLanguage="JavaScript"
                isFetching={true}
                onLanguageChange={mockOnLanguageChange}
            />
        );

        const pythonInput = screen.getByTestId('language-filter-Python') as HTMLInputElement;
        expect(pythonInput).toBeDisabled();
    });
});
