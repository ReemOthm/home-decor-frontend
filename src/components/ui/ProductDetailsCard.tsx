import { Box, Button, Card, CardContent, CardMedia, Modal, Stack, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";

import ColorCircles from "@/components/ui/ColorCircle";
import { capitalizeTitle } from "@/lib/utils";
import { Product } from "@/types";
import { addToCart } from "@/app/features/cartSlice";

interface IProductDetailsProps{
    productData: Product
}

const ProductDetailsCard = ({productData}: IProductDetailsProps)=>{

    const [counter, setCounter] = useState(1);
    const [price, setPrice] = useState(productData.price);
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    const handleOpenModal = ()=> setOpenModal((prev)=> !prev)

    const handleAddToCart=(productId:string, productName:string ,image:string, priceNumber:number, quantity:number)=> {
        dispatch(addToCart({
            productId, productName, image, price: price, quantity: counter
        }))
        setCounter(1)
        setPrice(productData.price)
    }  

    useEffect(()=>{
        setPrice(productData.price * counter)
    },[counter])

    return (
        <>
            { productData &&        
                <>
                    <Card sx={{ display: 'flex', maxWidth: "70%", mx: "auto", mt: "40px"}} className="card">
                        <CardMedia
                        component="img"
                        sx={{ width: "50%", cursor: "pointer" }}
                        image={productData.image}
                        alt={productData.productName}
                        onClick={handleOpenModal}
                        />
                        <CardContent sx={{flex: 1}}>
                            <Typography component="div" variant="h5">
                                {capitalizeTitle(productData.productName)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{pt: 2}}>
                                {productData.description}
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                Size: 400x1200
                            </Typography>
                            <Stack direction="row" justifyContent="space-between"  alignItems="center" sx={{py:1}}>
                                <Typography sx={{fontWeight: 500, fontSize: '20px'}}>{price} SAR</Typography>
                                <Box>
                                    <Button sx={{m: 0}} color="inherit" disabled = {counter == 1} onClick={()=> {setCounter(prev=> prev - 1);}}>
                                        <RemoveCircleIcon />
                                    </Button>
                                    <span>{counter}</span>
                                    <Button color="inherit" disabled = {counter == productData.quantity}  onClick={()=> {setCounter(prev=> prev + 1);}}>
                                        <AddCircleIcon/>
                                    </Button>
                                </Box>
                            </Stack>
                            <Stack direction="row" gap={1}>
                                {  productData.colors.length > 0 &&
                                    productData.colors.map((color:string) => <ColorCircles color={color} key={color}/> )
                                }
                            </Stack>
                            <Stack sx={{mt: 4}}>
                                {
                                    productData.quantity == 0 && 
                                    <Typography sx={{textAlign:"center", color:"red"}}>
                                        The product is out of stock
                                    </Typography>
                                }
                                <Button sx={{fontSize: 11, backgroundColor: "#b85454", "&:hover": {backgroundColor: "#943e3e"}}} variant="contained" endIcon={<ShoppingCartIcon />} 
                                    disabled = {productData.quantity == 0 }
                                    size="small"
                                    onClick={()=>handleAddToCart(productData.productID, productData.productName, productData.image, 1,1)}
                                >
                                        Add to cart
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Modal open={openModal} onClose={handleOpenModal}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#00000054",
                            display: "flex",
                            justifyContent: "center",
                            // alignItems: "center"
                        }}
                    >
                        <img src={productData.image} />

                    </Modal>
                </>
            }

        </>
    )
}

export default ProductDetailsCard;