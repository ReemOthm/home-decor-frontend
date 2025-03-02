import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { ReactNode } from "react";

import { Product } from "@/types";
import ColorCircles from "@/components/ui/ColorCircle";
import { addToCart } from "@/app/features/cartSlice";

interface ProductCardProps {
    product: Product,
    displayButtons?: boolean,
    children?: ReactNode
}

const ProductCard = ({product, displayButtons = true, children}:ProductCardProps)=>{

    const dispatch = useDispatch<AppDispatch>()
    
    const handleAddToCart=(productId:string, productName:string ,image:string, price:number, quantity:number)=> {
        dispatch(addToCart({
            productId, productName, image, price, quantity
        }))
    }    
    return ( 
        <Card sx={{filter: product.quantity == 0? "grayscale(1)" : "initial"}}> 
            <CardMedia sx={{ height: 194, backgroundSize: "contain"}} 
                image={product.image} 
                title={product.productName} 
            />
            <CardContent sx={{padding: "4px 15px"}}>
                <Typography gutterBottom variant="h5" component="div" sx={{mb:0}} fontSize={16}>
                    {product.productName}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between " sx={{py:1}}>
                    <Typography>{product.price} SAR</Typography>
                    <Typography fontSize={10}>{product.category ? product.category.name : product.categoryName}</Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                    {  product.colors.length > 0 &&
                        product.colors.map(color => <ColorCircles color={color} key={color}/> )
                    }
                </Stack>
            </CardContent>
            {
                displayButtons &&
                <CardActions sx={{py:2}}>
                    <Link className="no--style" to={`${product?.slug}`} >
                        <Button fullWidth  sx={{fontSize: 11, backgroundColor: "#b85454", "&:hover": {backgroundColor: "#943e3e"}}} variant="contained" endIcon={<VisibilityIcon />} size="small">Deatils</Button>
                    </Link>
                    <Button fullWidth sx={{fontSize: 11, padding: "4px 10px", margin : 0, backgroundColor: "#b85454", "&:hover": {backgroundColor: "#943e3e"}}} variant="contained" endIcon={<ShoppingCartIcon />} 
                        size="small" disabled = {product.quantity == 0} 
                        onClick={()=>handleAddToCart(product.productID, product.productName, product.image, product.price,1)}
                    >
                        Add 
                    </Button>
                </CardActions>
            }
            {children}
        </Card>
    )
}

export default ProductCard;