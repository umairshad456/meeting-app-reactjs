import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuthStore();
    const [shouldRedirect, setShouldRedirect] = React.useState(false);

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                if (isLoading) {
                    setShouldRedirect(true);
                }
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (shouldRedirect || (!isLoading && !isAuthenticated)) {
        return <Navigate to="/signin" replace />;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Render the protected routes if authenticated and not loading
    return <Outlet />;
};

export default ProtectedRoute;
