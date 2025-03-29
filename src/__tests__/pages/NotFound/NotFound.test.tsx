import {fireEvent, render, screen} from '@testing-library/react';
import wrapWithQueryClientProvider from '@hooks/renderWithQueryClientProvider.tsx';
import NotFound from '@pages/NotFound/NotFound.tsx';

describe('NotFound Component', () => {
    it('renders notFound page', () => {
        render(wrapWithQueryClientProvider(<NotFound />));

        const notFoundContainer = screen.getByTestId('notfound-container');

        expect(notFoundContainer).toBeInTheDocument();
    });

    it('navigates to dashboard page', async () => {
        render(wrapWithQueryClientProvider(<NotFound />));

        const goDashboardButton = screen.getByTestId('go-dashboard-button');
        fireEvent.click(goDashboardButton);

        expect(goDashboardButton).toBeInTheDocument();
    });
});