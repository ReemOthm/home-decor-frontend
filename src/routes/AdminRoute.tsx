import { Outlet } from "react-router-dom";

import { Login } from "@/pages";

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    
    return token !== null && isAdmin == 'true' ? <Outlet /> : <Login />
};

export default ProtectedRoute;
