import { Helmet } from "react-helmet"
import { Typography, Stack } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

import ResizablePanel from "@/components/ui/ResizablePanel"
import useApiQuery from "@/hooks/useApiQuery";

export const Dashboard = ()=>{

    const { data, isLoading, error} = useApiQuery({
        queryKey: ["profile"],
        method: "get" ,
        url: `/users/profile`
    });

    if(isLoading) return  <h1>Loading ....</h1>

    return (
        <>
            <Helmet title="Dashboard" />

            { 
                <ResizablePanel leftPanel={
                    <Stack mt={2} spacing={2}>
                        <Typography>
                            <NavLink to="information">Admin Information</NavLink>
                        </Typography>
                        <Typography>
                            <NavLink to="users">Users</NavLink>
                        </Typography>
                        <Typography>
                            <NavLink to="products">Products</NavLink>
                        </Typography>
                        <Typography>
                            <NavLink to="categories">Categories</NavLink>
                        </Typography>
                        <Typography>
                            <NavLink to="orders">Orders</NavLink>
                        </Typography>
                    </Stack>
                } 
                rightPanel={
                    <Stack>
                        <Typography textAlign={"right"}>{data.data?.result?.email}</Typography>
                        <Stack>
                            <Outlet context={data.data.result} />
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