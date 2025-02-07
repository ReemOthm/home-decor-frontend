import { TableRow, Typography, TableCell, IconButton, Box , Collapse, TableHead, TableBody, Table, Paper, TableContainer, Avatar, Pagination, Skeleton, Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FormEvent, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";

import { Order, Product } from "@/types";
import { fetchOrders, updateOrder } from "@/app/features/orderSlice";
import CreateModal from "@/components/modals/CreateModal";


const Row = (props: { row: Order, handleOpenUpdate:()=>void, setStatus:(status:number)=>void,setOrder:(orderId:string)=>void})=>{

    const [open, setOpen] = useState(false);
    const { row, handleOpenUpdate, setStatus, setOrder } = props;

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.orderId}
                </TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.payment}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell align="right">
                    <button onClick={()=>{handleOpenUpdate(); setStatus(Number(row.status)); setOrder(row.orderId)}}>Update</button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                            Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Product Image</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total Price ($)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.products.map((historyRow: Product) => (
                                <TableRow key={historyRow.productID}>
                                    <TableCell component="th" scope="row">
                                        {historyRow.productName}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Avatar alt={historyRow.productName} src={historyRow.image} sx={{mx: "20px"}}/>
                                    </TableCell>
                                    <TableCell align="right">{historyRow.quantity}</TableCell>
                                    <TableCell align="right">{historyRow.price}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default function Orders () {

    // const [pageNumber, setPageNumber] = useState(1);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [status, setStatus] = useState(0);
    const [order, setOrder] = useState<string>("");
    
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, orders, error] = useSelector((state:any)=>[
        state.orderRoducer.isLoading,
        state.orderRoducer.orders,
        state.orderRoducer.error,
    ],shallowEqual)

    useEffect(()=>{
        dispatch(fetchOrders())
    },[])
    
    const handleOpenUpdate = ()=> setOpenUpdate(!openUpdate)
    const handleUpdateOrder = async(e:FormEvent)=> {
        e.preventDefault()
        await dispatch(updateOrder({orderId:order,status}))
        handleOpenUpdate()
    }
    const handleChangeStatus = (e: SelectChangeEvent<number>)=> setStatus(Number(e.target.value))
        
    const UpdatedSelect = ()=>{
        return <>
                <Typography align="center" fontSize={24}>Update Order Status</Typography>
                <Stack sx={{paddingBottom: "20px"}}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Status</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={status}
                            label="Status"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value={1}>Pending</MenuItem>
                            <MenuItem value={2}>Processing</MenuItem>
                            <MenuItem value={3}>Shipped</MenuItem>
                            <MenuItem value={4}>Delivered</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </>
    }

    if(isLoading) return <div>
        <Skeleton variant="rectangular" width="200px" height={30} sx={{m:"40px auto" }}/>
        <Skeleton variant="rectangular" width="100%" height={118} />
    </div>

    // const handlePageNumber = (event: React.ChangeEvent<unknown>,page: number)=> setPageNumber(page)

    return (
        <>
            {
                orders && orders.length > 0 &&
                <>
                    <TableContainer component={Paper} sx={{padding: "3rem" }}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Order ID</TableCell>
                                <TableCell>User ID</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Payment</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell >Created At</TableCell>
                                <TableCell >Update/Delete</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {orders.map((row:Order) => (
                                <Row key={row.orderId} row={row} handleOpenUpdate={handleOpenUpdate} 
                                    setStatus={setStatus} 
                                    setOrder={setOrder}
                                />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <CreateModal btnName='Update' open={openUpdate} close={handleOpenUpdate} 
                        handleClick={handleUpdateOrder} 
                        scroll={false}
                        formElement={<UpdatedSelect/>} 
                    />

                    {/* <Box sx={{width: "200px", margin: "40px auto"}}>
                        <Pagination count={orders.data.totalPages} variant="outlined" 
                            page={pageNumber} color="secondary" onChange={handlePageNumber} 
                        />
                    </Box> */}
                </>
            }
            {error && <p className="no--fpund">{error}</p>}
        </>
    );
}