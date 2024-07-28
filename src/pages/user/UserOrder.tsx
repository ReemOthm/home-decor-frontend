import { TableRow, Typography, TableCell, IconButton, Box , Collapse, TableHead, TableBody, Table, Paper, TableContainer, Avatar } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";

import useApiQuery from "@/hooks/useApiQuery";
import { Order, Product } from "@/types";


const Row = (props: { row: Order })=>{

    const [open, setOpen] = useState(false);
    const { row } = props;

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
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.payment}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
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

export default function UserOrder () {

    const { data: orders} = useApiQuery({
        queryKey: ["orders"],
        url: `/orders/my-orders`
    });

    return (
        <>
            {
                orders && orders.data.length > 0 && 
                <>
                    <TableContainer component={Paper} sx={{margin: "20px"}}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Order ID</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Payment</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell >Created At</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {orders.data.map((row:Order) => (
                                <Row key={row.orderId} row={row} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
        </>

    );
}