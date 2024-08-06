import { Helmet } from "react-helmet"
import { Typography, Stack } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';

import ResizablePanel from "@/components/ui/ResizablePanel"
import useApiQuery from "@/hooks/useApiQuery";

export const Dashboard = ()=>{

    const { data, isLoading, error} = useApiQuery({
        queryKey: ["profile"],
        url: `/users/profile`
    });

    if(isLoading) return  <h1>Loading ....</h1>

    return (
        <>
            <Helmet title="Dashboard" />

            { 
                data && data.data &&
                <ResizablePanel leftPanel={
                    <Stack mt={2} spacing={2}>
                        <Typography sx={{
                            fontWeight: "700",
                            textAlign: "center"
                        }}>Dashboard</Typography>
                        <NavLink to="information" className="flex--center">
                            <AccountBoxIcon sx={{color: "#7a3c3c"}} />
                            <span>Account</span>
                        </NavLink>
                        <NavLink to="users" className="flex--center">
                            <GroupsIcon sx={{color: "#7a3c3c"}} />
                            <span>Users</span>
                        </NavLink>
                        <NavLink to="products" className="flex--center">
                            <InventoryIcon sx={{color: "#7a3c3c"}} />
                            <span>Products</span>
                        </NavLink>
                        <NavLink to="categories" className="flex--center">
                            <CategoryIcon sx={{color: "#7a3c3c"}} />
                            <span>Categories</span>
                        </NavLink>
                        <NavLink to="orders" className="flex--center">
                            <LocalMallIcon sx={{color: "#7a3c3c"}} />
                            <span>Orders</span>
                        </NavLink>
                    </Stack>
                } 
                rightPanel={
                    <Stack>
                        <Typography sx={{ color: "rgb(146, 48, 48);", 
                            fontWeight: 700, m: "10px 0 10px auto", bgcolor: "#f7f7f7", width: "fit-content", padding: "5px 10px", 
                        }} >
                            {data.data.result?.email}</Typography>
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