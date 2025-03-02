import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { ProductDetails, AllProducts, Signup, Login, Profile, UserInformation, RootLayout, Home, Dashboard, AdminInformation, Products, Categories, Users } from "@/pages";
import UserOrder from './../pages/user/UserOrder';
import Orders from './../pages/admin/Orders';
import ErrorHandler from "@/components/ErrorHandler";
import ProtectedRoute from "./ProtectedRouter";
import PageNotFound from "@/pages/PageNotFound";
import AdminRoute from "./AdminRoute";
import { About } from "@/pages/About";
import Cart from "@/components/Cart";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout container={true}/>} errorElement={<ErrorHandler />}>
                <Route index element={<Home />} />
                <Route path="about" element={  <About />}  />
                <Route path="login" element={  <Login />}  />
                <Route path="signup" element={<Signup /> } />
                <Route path="cart" element={<Cart />}  />
                <Route path="products" element={<AllProducts />}  />
                <Route path="products/:slug" element={<ProductDetails />}  />

                <Route path="*" element={<PageNotFound />} />
            </Route>

            <Route element={<RootLayout container={false} />} errorElement={<ErrorHandler />}>
                <Route path="user" element={ <ProtectedRoute/> }>
                    <Route path="profile" element={<Profile />} >
                        <Route index element={<UserInformation />} />
                        <Route path="information" element={<UserInformation />} />
                        <Route path="order" element={<UserOrder />} />
                    </Route>
                </Route>

                <Route path="admin" element={<AdminRoute />}>
                    <Route path="dashboard" element={<Dashboard />} >
                        <Route index element={<AdminInformation />} />
                        <Route path="information" element={<AdminInformation />} />
                        <Route path="users" element={<Users />} />
                        <Route path="products" element={<Products />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                </Route>
            </Route>
        </>
    )
)

export default router;

