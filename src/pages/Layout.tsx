import { Container } from "@mui/material"

import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"
import { Footer } from "@/components/Footer"

interface RootLayoutProps{
    container: boolean
}

export const RootLayout = ({container}: RootLayoutProps)=>{
    return (
        <>
            <Navbar />
            {container ?
                <>
                    <Container>
                        <Outlet />
                    </Container>
                    <Footer />
                </>
                : 
                <Outlet />
            }

        </>
    )
}
