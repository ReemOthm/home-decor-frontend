import { Helmet } from "react-helmet"
import { Typography, Stack } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import { useDispatch, useSelector } from "react-redux";

import ResizablePanel from "@/components/ui/ResizablePanel"
import { AppDispatch } from "@/app/store";
import { setLoading } from "@/app/features/userSlice";

export const Dashboard = ()=>{

    const data = useSelector((state:any)=> state.userReducer.userData)
    const dispatch = useDispatch<AppDispatch>()

    const handeleLoading = ()=> dispatch(setLoading(true))

    return (
        <>
            <Helmet title="Dashboard" />
            { 
                data &&
                <ResizablePanel leftPanel={
                    <Stack mt={2} spacing={2}>
                        <NavLink to="information" className="flex--center">
                            <AccountBoxIcon sx={{color: "#7a3c3c"}} />
                            <span>Account</span>
                        </NavLink>
                        <NavLink to="users" className="flex--center" onClick={()=> handeleLoading()}>
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
                            {data.email}</Typography>
                        <Stack>
                            <Outlet context={data} />
                        </Stack>
                    </Stack>
                } 
                showLeftPanel={true}
                />
            }
        </>
    )
}