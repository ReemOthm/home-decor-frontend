import { useDispatch, useSelector } from "react-redux";

import { StyledTableCell, StyledTableRow } from "../CustomizedTables";
import { banUser, deleteUser } from "@/app/features/userSlice";
import { AppDispatch } from "@/app/store";
import { User } from "@/types";

export const UsersTable = ()=> {

    const rows = useSelector((state:any)=> state.userReducer.users)
    const dispatch = useDispatch<AppDispatch>()

    const handleBannedUser = (userId:string)=> {
        dispatch(banUser(userId))
    }

    const handleDeleteUser = async(userId:string)=> {
        dispatch(deleteUser(userId))
    }

    return (
        <>
            { rows && rows.length > 0 &&
                rows.map((row:User) => (
                        <StyledTableRow key={row.userID}>
                        <StyledTableCell component="th" scope="row">
                            {row.username}
                        </StyledTableCell>
                            <StyledTableCell >{row.firstName} {row.lastName}</StyledTableCell>
                            <StyledTableCell >{row.email}</StyledTableCell>
                            <StyledTableCell >{row.phoneNumber}</StyledTableCell>
                            <StyledTableCell >{row.isAdmin? "Yes": "No"}</StyledTableCell>
                            <StyledTableCell >{row.isBanned? "Yes": "No"}</StyledTableCell>
                            <StyledTableCell >{row.createdAt}</StyledTableCell>
                            <StyledTableCell >
                                <button  onClick={()=>handleDeleteUser(row.userID)}>Delete</button>
                                <button onClick={()=>handleBannedUser(row.userID)}>{row.isBanned ? "UnBanned" : "Banned"}</button>
                            </StyledTableCell>
                        </StyledTableRow>
                ))
            }
        </>
    )
}