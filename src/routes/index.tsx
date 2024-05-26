import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { ProductDetails, Products, Signup, Login, Profile, UserInformation, RootLayout, Home, Dashboard } from "@/pages";
import UserOrder from './../pages/user/UserOrder';
import ErrorHandler from "@/components/ErrorHandler";
import ProtectedRoute from "./ProtectedRouter";
import PageNotFound from "@/pages/PageNotFound";

const token = localStorage.getItem('token');
const admin = localStorage.getItem('admin');

const tokenExist = token !== null ? true : false;
const isAdmin = admin == 'true' ? true : false;

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout/>} errorElement={<ErrorHandler />}>
                <Route index element={<Home />} />
                <Route
                    path="login"
                    element={
                        <ProtectedRoute isAllowed={!tokenExist} 
                            redirectPath= {isAdmin ? "/Dashboard" : "/profile"}
                        >
                            <Login />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="signup"
                    element={
                        <ProtectedRoute isAllowed={!tokenExist} redirectPath="/login">
                            <Signup />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="profile" 
                    element={
                        <ProtectedRoute isAllowed={tokenExist} redirectPath="/login"> 
                            <Profile />
                        </ProtectedRoute>
                    } 
                />
                <Route path="profile" element={<Profile />} >
                    <Route path="information" element={<UserInformation />} />
                    <Route path="order" element={<UserOrder />} />
                </Route>
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute isAllowed={tokenExist} redirectPath="/login">
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                {/* Admin Dashbord pages here later*/}
                <Route path="products" element={<Products />}  />
                <Route path="products/:slug" element={<ProductDetails />}  />

                <Route path="*" element={<PageNotFound />} />
            </Route>
        </>
    )
)

export default router;

