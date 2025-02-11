import React from 'react';
import {NOT_FOUND_TEXT} from '../../helpers/constant.ts';
import notFoundStyles from '../../assets/styles/pages/NotFound/NotFound.module.css'
import {useNavigate} from 'react-router-dom';

/**
 * NotFound component to display a 404 page when a route is not matched.
 * @returns A simple 404 error page with a message.
 */
const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoDashboard = () => {
        navigate('/'); // Navigate to the previous page
    };

    return (
        <div className={notFoundStyles.notFoundContainer} data-testid='notfound-container'>
            <div className={notFoundStyles.notFoundText}>{NOT_FOUND_TEXT}</div>
            <button data-testid='go-dashboard-button' className={notFoundStyles.goDashboardButton} onClick={handleGoDashboard}>
                Go to Dashboard
            </button>
        </div>
    );
};

export default NotFound;