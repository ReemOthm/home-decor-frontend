import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom"

import useApiQuery from "@/hooks/useApiQuery";
import ProductDetailsCard from "@/components/ui/ProductDetailsCard";

export const ProductDetails = ()=>{

    const {slug} = useParams()

    // Queries
    const { data, error, isLoading } = useApiQuery({
        queryKey: ["products"],
        url: `products/:${slug}`}
    );
    
    const { data: categories} = useApiQuery({
        queryKey: ["categories"],
        url: `/categories/${data?.data?.category?.categoryID}`
    });
    
    if(isLoading) return <h1>Product is loading</h1>

    return (
        <>
            <Helmet title={data?.data?.productName} />

            {
                data && data.data && <ProductDetailsCard productData={data.data} />
            }

            { categories && categories.data  && categories.data.products?.length > 0 &&
                <div className="related__products">
                    <Typography textAlign={"center"}>Products you might like</Typography>
                    <div>
                        <Link to={`../products/${categories.data.products[0]?.slug}`}>
                            <div className="image">
                                <img src={categories.data.products[0]?.image}/>
                            </div>
                        </Link>
                        <Link to={`../products/${categories.data.products[1]?.slug}`}>
                            <div className="image">
                                <img src={categories.data.products[1]?.image}/>
                            </div>
                        </Link>
                        <Link to={`../products/${categories.data.products[2]?.slug}`} >
                            <div className="image">
                                <img src={categories.data.products[2]?.image}/>
                            </div>
                        </Link>
                    </div>  
                </div>
            }

            {error && <p >{error.message}</p>} 
        </>
    )
}

