import { Navigate } from 'react-router-dom';
import React from 'react';

interface PrivateRouteProps {
    element: React.ReactNode; // ou React.ReactElement si tu veux être plus strict
    isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated }) => {
    return isAuthenticated ? <>{element}</> : <Navigate to="/" />;
};

export default PrivateRoute;

