import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { ProductDetails, Products, Signup, Login, Profile, UserInformation, RootLayout, Home, Dashboard } from "@/pages";
import UserOrder from './../pages/user/UserOrder';
import ErrorHandler from "@/components/ErrorHandler";
import ProtectedRoute from "./ProtectedRouter";
import PageNotFound from "@/pages/PageNotFound";
import AdminRoute from "./AdminRoute";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout/>} errorElement={<ErrorHandler />}>
                <Route index element={<Home />} />
                <Route path="login" element={  <Login />}  />
                <Route path="signup" element={<Signup /> } />
                <Route path="products" element={<Products />}  />
                <Route path="products/:slug" element={<ProductDetails />}  />

                <Route path="user" element={ <ProtectedRoute/> }>
                    <Route path="profile" element={<Profile />} >
                        <Route path="information" element={<UserInformation />} />
                        <Route path="order" element={<UserOrder />} />
                    </Route>
                </Route>

                <Route path="dashboard" element={<AdminRoute />}>
                    <Route path="admin" element={<Dashboard />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Route>
        </>
    )
)

export default router;

