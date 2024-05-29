import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

import { Product } from "@/types";
import ColorCircles from "@/components/ui/ColorCircle";
import { capitalizeTitle } from "@/lib/utils";

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
            <CardContent sx={{padding: "4px 15px"}}>
                <Typography gutterBottom variant="h5" component="div" sx={{mb:0}}>
                    {capitalizeTitle(product.productName)}
                </Typography>
                <Stack direction="row" alignItems="end" justifyContent="space-between " sx={{py:1}}>
                    <Typography>{product.price} SAR</Typography>
                    <Typography>{product.category.name}</Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                    {  product.colors.length > 0 &&
                        product.colors.map(color => <ColorCircles color={color} key={color}/> )
                    }
                </Stack>
            </CardContent>
            <CardActions sx={{py:2}}>
                <Link className="no--style" to={`${product?.slug}`} >
                    <Button fullWidth  sx={{fontSize: 11, backgroundColor: "#b85454", "&:hover": {backgroundColor: "#943e3e"}}} variant="contained" endIcon={<VisibilityIcon />} size="small">Deatils</Button>
                </Link>
                <Button fullWidth sx={{fontSize: 11, padding: "4px 10px", margin : 0, backgroundColor: "#b85454", "&:hover": {backgroundColor: "#943e3e"}}} variant="contained" endIcon={<ShoppingCartIcon />} 
                    size="small" disabled = {product.quantity == 0}
                >
                    Add 
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;