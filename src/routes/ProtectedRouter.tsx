import { Outlet } from "react-router-dom";

import { Login } from "@/pages";

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  return token !== null ? <Outlet /> : <Login />
};

export default ProtectedRoute;
