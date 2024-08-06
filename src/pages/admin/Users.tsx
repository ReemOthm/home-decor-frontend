import CustomizedTables, { renderUserTable, tableHead } from "@/components/CustomizedTables";
import useApiQuery from "@/hooks/useApiQuery";
import { Box, Pagination, Skeleton } from "@mui/material";
import { useState } from "react";

export const Users = ()=>{

    const [pageNumber, setPageNumber] = useState(1);

    const { data:users, isLoading, error, refetch} = useApiQuery({
        queryKey: ["users", `${pageNumber}`],
        url: `/users?pageNumber=${pageNumber}&pageSize=6`
    });

    const handlePageNumber = (event: React.ChangeEvent<unknown>,page: number)=> setPageNumber(page)

    if(isLoading) return <Skeleton variant="rectangular" width="100%" height={118} />

    return (
        <>
            <CustomizedTables renderRows={renderUserTable(users.data.items,refetch)} columns={tableHead.users}  /> 
            <Box sx={{width: "200px", margin: "40px auto "}}>
                <Pagination count={users.data.items.totalPages} variant="outlined" 
                    page={pageNumber} color="secondary" onChange={handlePageNumber} 
                />
            </Box>
            { error && <p>{error.message}</p> }
        </>
    )
}

