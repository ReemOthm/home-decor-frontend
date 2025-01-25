import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Login } from "@/pages";

const ProtectedRoute = () => {
  const token = useSelector((state:any)=> state.userReducer.token)
  return token !== null ? <Outlet /> : <Login />
};

export default ProtectedRoute;
