import { Button, Card, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import { ShoppingCartIcon } from "lucide-react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom"

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

    if(isLoading) return <h1>Products are loading</h1>

    return (
        <Container>
            <Helmet title={data?.data.productName} />
            { data &&             
                <Card sx={{ display: 'flex', maxWidth: "70%", margin: "auto" }}>
                    <CardMedia
                    component="img"
                    sx={{ width: "50%" }}
                    image={data.data.image}
                    alt={data.data.productName}
                    />
                    <CardContent>
                        <Typography component="div" variant="h5">
                        {capitalizeTitle(data.data.productName)}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{pt: 2}}>
                        {data.data.description}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{py:1}}>
                            <Typography>{data.data.price} SAR</Typography>
                            {/* <Link to={"/"}>{product.category}</Link> */}
                        </Stack>
                        <Stack direction="row" gap={1}>
                            {  data.data.colors.length > 0 &&
                                data.data.colors.map((color:string) => <ColorCircles color={color} key={color}/> )
                            }
                        </Stack>
                        <Stack sx={{mt: 4}}>
                            <Button sx={{fontSize: 11}} variant="contained" endIcon={<ShoppingCartIcon />} size="small">Add to cart</Button>
                        </Stack>
                    </CardContent>
                </Card>
            }
            {error && <p >{error.message}</p>} 
        </Container>
    )
}

