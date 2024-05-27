import CustomizedTables, { renderUserTable, tableHead } from "@/components/CustomizedTables";
import useApiQuery from "@/hooks/useApiQuery";

export const Users = ()=>{

    const { data:users, isLoading, error, refetch} = useApiQuery({
        queryKey: ["users"],
        method: "get" ,
        url: `/users`
    });

    if(isLoading) return  <h1>Loading ....</h1>

    return (
        <>
            <CustomizedTables renderRows={renderUserTable(users.data,refetch)} columns={tableHead.users}  /> 
            
            { error && <p>{error.message}</p> }
        </>
    )
}

