import { Container } from "@mui/material"

import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"
import { Footer } from "@/components/Footer"

export const RootLayout = ()=>{
    return (
        <>
            <Navbar />
            <Container sx={{minHeight: "90vh"}}>
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}
