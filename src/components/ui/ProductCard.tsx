import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

import { Product } from "@/types";
import ColorCircles from "@/components/ui/ColorCircle";
import { capitalizeTitle, discrptionSlice } from "@/lib/utils";

interface ProductCardProps {
    product: Product
}

const ProductCard = ({product}:ProductCardProps)=>{
    
    return (
        <Card sx={{filter: product.quantity == 0? "grayscale(1)" : "initial"}}> 
            <CardMedia sx={{ height: 194}} 
                image={product.image} 
                title={product.productName} 
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {capitalizeTitle(product.productName)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{height: "40px"}}>
                    {discrptionSlice(product.description)}
                </Typography>
                <Stack direction="row" alignItems="end" justifyContent="space-between" sx={{py:1}}>
                    <Typography>{product.price} SAR</Typography>
                    <Typography>{product.category.name}</Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                    {  product.colors.length > 0 &&
                        product.colors.map(color => <ColorCircles color={color} key={color}/> )
                    }
                </Stack>
            </CardContent>
            <CardActions sx={{justifyContent: "center"}}>
                <Link to={`${product.slug}`} >
                    <Button sx={{fontSize: 11}} variant="contained" endIcon={<VisibilityIcon />} size="small">Show Deatils</Button>
                </Link>
                <Button sx={{fontSize: 11}} variant="contained" endIcon={<ShoppingCartIcon />} 
                    size="small" disabled = {product.quantity == 0}
                >
                    Add to cart 
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;