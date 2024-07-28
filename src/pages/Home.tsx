import { Grid, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import useApiQuery from "@/hooks/useApiQuery";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

export const Home = ()=>{

    // Queries
    const { data, error, isLoading } = useApiQuery({
        queryKey: ["products"],
        url: `/products?page=1&pageSize=8`
    });

    return (
        <>
            <Helmet title="Home" />
            <div className="landing">
                <Stack alignItems="center" sx={{position: "relative", textAlign: "center", mt: 8}} spacing={2}>
                    <h1>HomeDecore</h1>
                    <p>Discover the latest collections of home decoration and accessories</p>
                    <Link to="/products" className="button fit--width">Shop Now</Link>
                </Stack>
            </div>

            <Stack spacing={2} alignItems="center" sx={{mt: "600px", mb: "30px", textAlign: "center"}} >
                <Typography variant="h2">About</Typography>
                <p className="about__description">Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam inventore modi quos aspernatur veritatis maiores doloremque sint vero aliquam esse perspiciatis excepturi, sunt deleniti odit ut. Nam sit amet consectetur adipisicing elit. Odit iusto eligendi sed architecto temporibus earum fuga maxime, natus inventore iure. Incidunt ipsa veniam iusto eaque repellendus excepturi cupiditate voluptate corrupti.</p>
                <Link to="/about" className="button fit--width">Read More</Link>
            </Stack>

            { data && data.items?.length > 0 &&
                <Stack spacing={4} alignItems="center" mb={6}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 8 }} justifyContent="center">                
                        { data.items.map((product:Product) => ( 
                            <Grid item xs={2} sm={2} md={2} key={product.productID}>
                            <ProductCard product={product} displayButtons={false} /> 
                        </Grid>
                        ))}
                    </Grid>
                    <Link to="/products" className="button fit--width" onClick={()=> scrollTo(0,0)}>Show More</Link>
                </Stack>
            }


            {error && <p >{error.message}</p>} 

        </>
    )
}

