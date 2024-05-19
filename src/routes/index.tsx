import { ProductDetails } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";


const index = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/products/:slug" element={<ProductDetails />}  />
            </Routes>
        </BrowserRouter>
    )
}

export default index;