import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { ProductDetails, Products, Signup, Login } from "@/pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route path="/products" element={<Products />}  />
                <Route path="products/:slug" element={<ProductDetails />}  />
                <Route path="signup" element={<Signup />}  />
                <Route path="login" element={<Login />}  />
            </Route>
        </>
    )
)

export default router;