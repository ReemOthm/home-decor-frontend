import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useEffect } from "react";
import { fetchProducts } from "@/app/features/productSlice";

export const Home = ()=>{

    const dispatch = useDispatch<AppDispatch>()
    const [error, products, isLoading] = useSelector((state:any)=> [
        state.productRoducer.error,
        state.productRoducer.products, 
        state.productRoducer.isLoading,
    ], shallowEqual)

    useEffect(()=>{
        dispatch(fetchProducts({
            pageNumber: "1",
            category: "",
            searchKeyword: "",
            minPrice: "",
            maxPrice: ""
        }))
    },[dispatch])

    return (
        <>
            <Helmet title="Home" />
            <div className="landing">
                <Stack alignItems="center" sx={{position: "relative", textAlign: "center", mt: 8}} spacing={3}>
                    <h1>HomeDecore</h1>
                    <p>Discover the latest collections of home decoration and accessories</p>
                    <Link to="/products" className="button fit--width">Shop Now</Link>
                </Stack>
            </div>

            <Stack spacing={2} alignItems="center" sx={{mt: "105vh" ,mb: "30px", textAlign: "center"}} >
                <Typography variant="h2">About</Typography>
                <p className="about__description">Lorem ipsum dolor Lorem ipsum dolor sit amet consecvero aliquam esse perspiciatis excepturi, sunt deleniti adipisicing elit. Odit iusto eligendi sed architecto temporibus earum fuga maxime, natus inventore iure. Incidunt ipsa veniam iusto eaque repellendus excepturi cupiditate voluptate corrupti.</p>
                <Link to="/about" className="button fit--width">Read More</Link>
            </Stack>

            {
                isLoading ? 
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 8 }} justifyContent="center" mb={6}>
                        { Array.from(new Array(8)).map((e,index) => ( 
                                <Grid item xs={2} sm={2} md={2}  key={index}>
                                    <Skeleton variant="rectangular" width={210} height={118} />
                                    <Skeleton width="80px" />
                                    <Skeleton width="170px" />
                                    <Stack direction="row" spacing={1} >
                                        <Skeleton variant="circular" width={20} height={20} />
                                        <Skeleton variant="circular" width={20} height={20} />
                                        <Skeleton variant="circular" width={20} height={20} />
                                    </Stack>
                                </Grid>
                            ))
                        }
                    </Grid> 
                    : 
                    <>
                        { products && products.length > 0 &&
                            <Stack spacing={4} alignItems="center" mb={6}>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 8 }} justifyContent="center">                
                                    { products.map((product:Product) => ( 
                                        <Grid item xs={2} sm={2} md={2} key={product.productID}>
                                            <ProductCard product={product} displayButtons={false} /> 
                                        </Grid>
                                    ))}
                                </Grid>
                                <Link to="/products" className="button fit--width" onClick={()=> scrollTo(0,0)}>Show More</Link>
                            </Stack>
                        }
                    </>
            }
            {error && <p >{error}</p>} 
        </>
    )
}

