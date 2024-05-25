import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { ProductDetails, Products, Signup, Login, Profile, UserInformation } from "@/pages";
import UserOrder from './../pages/user/UserOrder';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route path="/products" element={<Products />}  />
                <Route path="products/:slug" element={<ProductDetails />}  />
                <Route path="signup" element={<Signup />}  />
                <Route path="login" element={<Login />}  />
                <Route path="profile" element={<Profile />}>
                    <Route path="information" element={<UserInformation />}  />
                    <Route path="order" element={<UserOrder />}  />
                </Route>
            </Route>
        </>
    )
)

export default router;