import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Dashboard from '@pages/Dashboard/Dashboard';
import NotFound from '@pages/NotFound/NotFound';

/**
 * Main App component that contains routing logic for the application.
 * It renders the `Dashboard` component for the root route (`/`)
 * and a `NotFound` component for unknown routes.
 * @returns The Router with Routes defined for the app.
 */
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </Router>
    );
}

export default App;
