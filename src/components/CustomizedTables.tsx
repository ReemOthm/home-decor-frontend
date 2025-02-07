import { styled } from '@mui/material/styles';
import {Table, TableBody,TableCell,tableCellClasses, TableContainer ,TableHead, TableRow, Paper} from '@mui/material';
import { ReactNode } from 'react';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: 5,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 6,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const tableHead= {
    users : ['Username',"Name", "Email","Phone Number", "Admin","Banned", "Created At", "Delete/Block"],
    categories : ["Name", "Description", "Slug" ,"Created AT", "Edit/Delete"],
}

interface CustomizedTablesProps {
    renderRows: ReactNode, 
    columns: string[]
}

const CustomizedTables = ({renderRows, columns}: CustomizedTablesProps) => {
    return (
        <TableContainer component={Paper} sx={{ml: "20px" }}>
            <Table sx={{ minWidth: 700}} aria-label="customized table">
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