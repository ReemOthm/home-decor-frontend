import { Box, Grid, Pagination } from "@mui/material";
import { Helmet } from "react-helmet";
import { useState } from "react";

import useApiQuery from "./../hooks/useApiQuery";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

export const Products = ()=>{

    const [pageNumber, setPageNumber] = useState(1);

    // Queries
    const { data, error, isLoading } = useApiQuery({queryKey: ["products", `${pageNumber}`],method: "get" ,url: `/products?pageNumber=${pageNumber}`});
    console.log(data)

    const handlePageNumber = (event: React.ChangeEvent<unknown>,page: number)=> setPageNumber(page)

    if(isLoading) return <h1>Products are loading</h1>

    return (
        <>
            <Helmet title="Products" />
            {
                data && 
                <>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 5, md: 7 }} justifyContent="center">                
                        { data.data.items?.map((product:Product) => ( 
                        <Grid item xs={2} sm={2} md={2} key={product.productID}>
                            <ProductCard product={product}  /> 
                        </Grid>
                        ))}
                    </Grid>
                    
                    <Box sx={{width: "fit-content", margin: "40px auto"}}>
                        <Pagination count={data.data.totalPages} variant="outlined" 
                            page={pageNumber} color="secondary" onChange={handlePageNumber} 
                        />
                    </Box>
                </>
            }

            {error && <p >{error.message}</p>} 
        </>
    )
}

