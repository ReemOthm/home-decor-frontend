import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Stack, Typography } from "@mui/material";

const PageNotFound = ()=>{
    return (
        <div>
            <Helmet title="Page Not Found" />
            <Stack alignItems={"center"} justifyContent={"center"} sx={{height: "80vh"}}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h5" sx={{mb: "20px"}}>Page not Found</Typography>
                <button className="button fit--width">
                    <Link to={"/"}>Go to Home</Link>
                </button>
            </Stack>
        </div>
    )
}

export default PageNotFound;