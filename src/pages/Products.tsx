import { Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet";

import useApiQuery from "./../hooks/useApiQuery";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

export const Products = ()=>{

    // Queries
    const { data, error, isLoading } = useApiQuery({queryKey: ["products"],method: "get" ,url: "/products"});
    
    if(isLoading) return <h1>Products are loading</h1>
    
    return (
        <Container>
            <Helmet title="Products" />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 5, md: 7 }} justifyContent="center">                
                {data.data.items?.map((product:Product) => ( 
                <Grid item xs={2} sm={2} md={2} key={product.productID}>
                    <ProductCard product={product}  /> 
                </Grid>
                ))}
            </Grid>
            {error && <p >{error.message}</p>} 
        </Container>
    )
}

