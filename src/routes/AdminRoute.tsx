import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Login } from "@/pages";

const ProtectedRoute = () => {

    const token = useSelector((state:any)=> state.userReducer.token)
    const isAdmin = useSelector((state:any)=> state.userReducer.isAdmin)

    
    return token !== null && isAdmin == true ? <Outlet /> : <Login />
};

export default ProtectedRoute;
