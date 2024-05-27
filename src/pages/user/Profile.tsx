import { Typography, Stack } from "@mui/material";
import { Helmet } from "react-helmet";
import { NavLink, Outlet } from "react-router-dom";

import useApiQuery from "@/hooks/useApiQuery";
import ResizablePanel from "@/components/ui/ResizablePanel";


export const Profile = ()=>{

    const { data, isLoading, error} = useApiQuery({
        queryKey: ["profile"],
        method: "get" ,
        url: `/users/profile`
    });


    if(isLoading) return <h1>Loading ....</h1>

    return (
        <>
            <Helmet title="Profile" />
            {data &&  data.data.result &&
                <ResizablePanel leftPanel={
                    <Stack mt={2} spacing={2}>
                        <Typography>
                            <NavLink to="information">User Information</NavLink>
                        </Typography>
                        <Typography>
                            <NavLink to="order">Orders</NavLink>
                        </Typography>
                    </Stack>
                } 
                rightPanel={
                    <Stack>
                        <Typography textAlign={"right"}>{data.data?.result?.email}</Typography>
                        <Stack>
                            <Outlet context={data.data.result}  />
                        </Stack>
                    </Stack>
                } 
                showLeftPanel={true}
                />

            }
            {error && <p>{error.message}</p>}
        </>
    )
}