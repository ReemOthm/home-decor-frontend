import { Button, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { ShoppingCartIcon } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom"

import ColorCircles from "@/components/ui/ColorCircle";
import useApiQuery from "@/hooks/useApiQuery";
import { capitalizeTitle } from "@/lib/utils";

export const ProductDetails = ()=>{

    const {slug} = useParams()
    
    // Queries
    const { data, error, isLoading } = useApiQuery({
        queryKey: ["products"],
        method: "get" ,
        url: `products/:${slug}`}
    );

    const { data: categories} = useApiQuery({
        queryKey: ["categories"],
        method: "get" ,
        url: `/categories/${data?.data?.category?.categoryID}`
    });

    if(isLoading) return <h1>Product is loading</h1>

    return (
        <>
            <Helmet title={data?.data.productName} />
            { data &&             
                <Card sx={{ display: 'flex', maxWidth: "70%", mx: "auto", mt: "40px"}} className="card">
                    <CardMedia
                    component="img"
                    sx={{ width: "50%" }}
                    image={data.data.image}
                    alt={data.data.productName}
                    />
                    <CardContent sx={{flex: 1}}>
                        <Typography component="div" variant="h5">
                        {capitalizeTitle(data.data.productName)}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{pt: 2}}>
                        {data.data.description}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{py:1}}>
                            <Typography sx={{fontWeight: 500}}>{data.data.price} SAR</Typography>
                            <Typography>{data.data.category.name}</Typography>
                        </Stack>
                        <Stack direction="row" gap={1}>
                            {  data.data.colors.length > 0 &&
                                data.data.colors.map((color:string) => <ColorCircles color={color} key={color}/> )
                            }
                        </Stack>
                        <Stack sx={{mt: 4}}>
                            <Button sx={{fontSize: 11, backgroundColor: "#b85454", "&:hover": {backgroundColor: "#943e3e"}}} variant="contained" endIcon={<ShoppingCartIcon />} 
                                disabled = {data.data.quantity == 0 }
                                size="small">
                                    Add to cart
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            }

            { categories && categories.data.products.length > 0 && 
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

