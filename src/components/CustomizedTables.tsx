import { styled } from '@mui/material/styles';
import {Table, TableBody,TableCell,tableCellClasses, TableContainer ,TableHead, TableRow, Paper, Avatar} from '@mui/material';
import { ReactNode } from 'react';

import { Category, Order, Product, User } from '@/types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const tableHead= {
    users : ['Username',"First Name", "Last Name", "Phone Number", "Address", "Birth Date", "Created At", "Details"],
    products : ["Name", "Category", "Quantity", "Price", "Created At", "Details"],
    categories : ["Name", "Description", "Slug" ,"Created AT", "Details"],
    orders : ["Order ID", "Status", "Payment", "Amount","Created AT", "Details"],
}

export const renderUserTable = (rows:User[], handleOpenDetails: ()=> void)=> {
    return (
        <>
            {
            rows.map((row:User) => (
                    <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                        {row.username}
                    </StyledTableCell>
                        <StyledTableCell >{row.firstName}</StyledTableCell>
                        <StyledTableCell >{row.lastName}</StyledTableCell>
                        <StyledTableCell >{row.phoneNumber}</StyledTableCell>
                        <StyledTableCell >{row.address}</StyledTableCell>
                        <StyledTableCell >{row.birthDate}</StyledTableCell>
                        <StyledTableCell >{row.createdAt}</StyledTableCell>
                        <StyledTableCell >
                            <button onClick={handleOpenDetails}>Details</button>
                        </StyledTableCell>
                    </StyledTableRow>
                ))
            }
        </>
    )
}

export const renderProductTable = (rows:Product[], handleOpenDetails: ()=> void)=> {
    return (
        <>
        {
            rows.map((row:Product) => (
                    <StyledTableRow key={row.productID}>
                    <StyledTableCell component="th" scope="row">
                        {row.productName}
                    </StyledTableCell>
                        <StyledTableCell >
                            <Avatar alt={row.productName} src={row.image} sx={{mx: "20px"}}/>
                        </StyledTableCell>
                        <StyledTableCell >{row.category.name}</StyledTableCell>
                        <StyledTableCell >{row.quantity}</StyledTableCell>
                        <StyledTableCell >{row.price}</StyledTableCell>
                        <StyledTableCell >{row.createdAt}</StyledTableCell>
                        <StyledTableCell >
                            <button onClick={handleOpenDetails}>Details</button>
                        </StyledTableCell>
                    </StyledTableRow>
                ))
            }
        </>
    )
}

export const renderCategoriesTable = (rows:Category[],handleOpenEdit: ()=> void, setCategory:(category:Category)=>void, handleOpenDelete: ()=> void)=> {
    return (
        <>
            {
                rows.map((row:Category) => (
                    <StyledTableRow key={row.categoryID}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                        <StyledTableCell >{row.description}</StyledTableCell>
                        <StyledTableCell >{row.slug}</StyledTableCell>
                        <StyledTableCell >{row.createdAt}</StyledTableCell>
                        <StyledTableCell >
                            <button onClick={()=> {handleOpenEdit(); setCategory(row)}}>Edit</button>
                            <button onClick={()=>{handleOpenDelete(); setCategory(row)}}>Delete</button>
                        </StyledTableCell>
                    </StyledTableRow>
                ))
            }
        </>
    )
}

export const renderOrdersTable = (rows:Order[], handleOpenDetails: ()=> void)=> {
    return (
        <>
            {
                rows.map((row:Order) => (
                    <StyledTableRow key={row.orderId}>
                    <StyledTableCell component="th" scope="row">
                        {row.orderId}
                    </StyledTableCell>
                        <StyledTableCell >{row.status}</StyledTableCell>
                        <StyledTableCell >{row.payment}</StyledTableCell>
                        <StyledTableCell >{row.amount}</StyledTableCell>
                        <StyledTableCell >{row.createdAt}</StyledTableCell>
                        <StyledTableCell >
                            <button onClick={handleOpenDetails}>Details</button>
                        </StyledTableCell>
                    </StyledTableRow>
                ))
            }
        </>
    )
}

interface CustomizedTablesProps {
    renderRows: ReactNode, 
    columns: string[]
}

const CustomizedTables = ({renderRows, columns}: CustomizedTablesProps) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    {columns.map((col, index) => <StyledTableCell key={index}>{col}</StyledTableCell>)}
                </TableRow>
                </TableHead>
                <TableBody>
                    {renderRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomizedTables;