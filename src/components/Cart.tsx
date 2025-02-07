import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { CartItem } from "@/types";
import { AppDispatch } from "@/app/store";
import { deleteItem, resetCart } from "@/app/features/cartSlice";
import { createOrder } from "@/app/features/orderSlice";

const Cart = ()=>{
    
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [cartProducts, totalPrice] = useSelector((state:any)=> [
        state.cartReducer.cartProducts,
        state.cartReducer.totalPrice,
    ], shallowEqual)

    const handleDeleteItem = (id:string)=> dispatch(deleteItem(id))
    const handleResetCart = ()=> dispatch(resetCart())
    const handleCreateOrder = async()=> {
        console.log(cartProducts)
        console.log(totalPrice)
        await dispatch(createOrder({items:cartProducts,amount:totalPrice}))
        navigate("../user/profile/order")
        dispatch(resetCart())
        localStorage.removeItem("cart")
    }
    
    return (
        <>
            <Helmet title="Shopping Cart" />
                { cartProducts.length > 0 ? 
                    <Stack direction={{sm: "row"}} width={{md: "75%"}} alignItems="start" gap={1} margin="auto">
                        <Stack gap={1} flexGrow={2} margin="20px 0" justifyContent="space-between" width={{xs: "100%", sm: "auto"}}>
                            <Stack direction="row" justifyContent="space-between" marginBottom={1}>
                                <Typography m={0}>You Have {cartProducts.length} item in the Cart</Typography>
                                <Button onClick={()=> handleResetCart()} sx={{fontSize: 11, color: "white", padding: "4px 10px", margin : 0, backgroundColor: "#c13333", "&:hover": {backgroundColor: "#c51717"}}}>
                                    Remove all item
                                </Button>
                            </Stack>
                            { cartProducts.map((item:CartItem)=>(
                                <Stack direction="row" padding="10px" sx={{border: "1px solid #ccc"}} key={item.productId}>
                                    <img src={item.image} alt={item.productName} width={80} height={50} />
                                    <Stack direction="row" sx={{alignItems:"center", flexGrow: "1", justifyContent:"space-between"}}>
                                        <Box width="38%">
                                            <Typography paddingLeft="20px">{item.productName}</Typography>
                                        </Box>
                                            <Typography sx={{fontWeight: "bold"}}>{item.price} SAR</Typography>
                                            <Typography>{item.quantity}</Typography>
                                        <Button onClick={()=>handleDeleteItem(item.productId)} sx={{fontSize: 11, color: "white", padding: "4px 10px", margin : 0, backgroundColor: "#c13333", "&:hover": {backgroundColor: "#c51717"}}}>Delete</Button>
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                        <Card sx={{margin:"20px 0", flexGrow:1, width: {xs:"100%", sm:"auto"}}}>
                            <Stack spacing={1} padding="25px">
                                <Stack justifyContent="space-between" direction="row"><span>Total Price: </span><Typography fontWeight="bold">{totalPrice} SAR</Typography></Stack>
                                <Stack justifyContent="space-between" direction="row"><span>Discount:</span><Typography fontWeight="bold">0%</Typography></Stack>
                                <Button onClick={()=>handleCreateOrder()} fullWidth variant="contained" color="success" sx={{fontSize: 14, padding: "4px 10px", position: "relative", top: "10px"}}>Buy</Button>
                            </Stack>
                        </Card>
                    </Stack>
                : <p className="no--found">Cart is Empty</p>
                }
        </>
    )
}

export default Cart;