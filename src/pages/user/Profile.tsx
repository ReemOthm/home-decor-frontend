import { Typography, Stack } from "@mui/material";
import { Helmet } from "react-helmet";
import { NavLink, Outlet } from "react-router-dom";

import ResizablePanel from "@/components/ui/ResizablePanel";
import { useSelector } from "react-redux";


export const Profile = ()=>{

    const data = useSelector((state:any)=> state.userReducer.userData)

    return (
        <>
            <Helmet title="Profile" />
            {data && 
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
                        <Typography sx={{textAlign: "right", color: "rgb(146, 48, 48);", fontWeight: 700, mt: "10px"}}>{data.data?.result?.email}</Typography>
                        <Stack>
                            <Outlet context={data}  />
                        </Stack>
                    </Stack>
                } 
                showLeftPanel={true}
                />

            }
        </>
    )
}