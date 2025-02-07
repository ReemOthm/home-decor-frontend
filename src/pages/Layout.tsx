import { Container, Stack } from "@mui/material"

import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"
import { Footer } from "@/components/Footer"

interface RootLayoutProps{
    container: boolean
}

export const RootLayout = ({container}: RootLayoutProps)=>{
    return (
        <Stack sx={{height: "100vh"}}>
            <Navbar />
            {container ?
                <>
                    <Container sx={{flexGrow: 1, width: "100%"}}>
                        <Outlet />
                    </Container>
                    <Footer />
                </>
                : 
                <Outlet />
            }

        </Stack>
    )
}
