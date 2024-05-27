import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { ProductDetails, AllProducts, Signup, Login, Profile, UserInformation, RootLayout, Home, Dashboard, AdminInformation, Products, Categories } from "@/pages";
import UserOrder from './../pages/user/UserOrder';
import Orders from './../pages/admin/Orders';
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
                <Route path="products" element={<AllProducts />}  />
                <Route path="products/:slug" element={<ProductDetails />}  />

                <Route path="user" element={ <ProtectedRoute/> }>
                    <Route path="profile" element={<Profile />} >
                        <Route path="information" element={<UserInformation />} />
                        <Route path="order" element={<UserOrder />} />
                    </Route>
                </Route>

                <Route path="admin" element={<AdminRoute />}>
                    <Route path="dashboard" element={<Dashboard />} >
                        <Route path="information" element={<AdminInformation />} />
                        <Route path="products" element={<Products />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Route>
        </>
    )
)

export default router;

