import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

import useApiQuery from "./../hooks/useApiQuery";
import { Product } from "@/types";
import ColorCircles from "@/components/ui/ColorCircle";
import { discrptionSlice } from "@/lib/utils";

export const Products = ()=>{

    // Queries
    const { data, error, isLoading } = useApiQuery({queryKey: ["products"],method: "get" ,url: "/products"});
    console.log(data);

    if(isLoading) return <h1>Products are loading</h1>
    
    return (
        <Container>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 5, md: 7 }} justifyContent="center">                
                {data?.map((product:Product) => (
                    <Grid item xs={2} sm={2} md={2} key={product.productID}>
                        <Card> 
                            <CardMedia sx={{ height: 194 }} image={product.image} title={product.productName} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {discrptionSlice(product.productName)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Stack direction="row" justifyContent="space-between" sx={{py:1}}>
                                    <Typography>{product.price}</Typography>
                                    {/* <Link to={"/"}>{product.category}</Link> */}
                                </Stack>
                                <Stack direction="row" gap={1}>
                                    {  product.colors.length > 0 &&
                                        product.colors.map(color => <ColorCircles color={color} key={color}/> )
                                    }
                                </Stack>
                            </CardContent>
                            <CardActions sx={{justifyContent: "center"}}>
                                <Button sx={{fontSize: 11}} variant="contained" endIcon={<VisibilityIcon />} size="small">Show Deatils</Button>
                                <Button sx={{fontSize: 11}} variant="contained" endIcon={<ShoppingCartIcon />} size="small">Add to cart</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {error && <p >{error.message}</p>} 
        </Container>
    )
}

