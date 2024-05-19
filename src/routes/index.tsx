import { ProductDetails, Products } from "@/pages";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route path="/products" element={<Products />}  />
                <Route path="products/:slug" element={<ProductDetails />}  />
            </Route>
        </>
    )
)

export default router;