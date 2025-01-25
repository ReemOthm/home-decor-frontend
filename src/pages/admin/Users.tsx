import CustomizedTables, { tableHead } from "@/components/CustomizedTables";
import { Box, Pagination, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "@/app/features/userSlice";
import { AppDispatch } from "@/app/store";
import {UsersTable} from "@/components/tables/UsersTable";

export const Users = ()=>{

    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>()
    const [error, totalPages] = useSelector((state:any)=> [
        state.userReducer.error,
        state.userReducer.totalPages, 
        state.userReducer.users 
    ], shallowEqual)
    
    useEffect(()=>{
        if(isLoading){
            dispatch(fetchUsers(pageNumber.toString()))
            setIsLoading(false)
        }
    }, [dispatch, isLoading, pageNumber])
    
    const handlePageNumber = (event: React.ChangeEvent<unknown>,page: number)=> {
        setIsLoading(true)
        setPageNumber(page)
    }
        
    if(isLoading) return <Skeleton variant="rectangular" width="100%" height={118} />

    return (
        <>
            <CustomizedTables renderRows={<UsersTable />} columns={tableHead.users} /> 

            { error? <p className="no--found">{error}</p> :
                <Box sx={{width: "200px", margin: "40px auto "}}>
                    <Pagination count={totalPages} variant="outlined" 
                        page={pageNumber} color="secondary" onChange={handlePageNumber} 
                    />
                </Box>
            }
        </>
    )
}

