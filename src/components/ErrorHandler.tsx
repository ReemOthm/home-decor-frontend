import { Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const ErrorHandler = ()=>{
    return (
        <>
            <Helmet title= "Error " />
            <Stack alignItems={"center"} justifyContent={"center"} sx={{height: "80vh"}}>
                <Typography variant="h3">An Error Occure</Typography>
                <Typography variant="h6" sx={{my: "20px", width: "550px", textAlign: "center"}}>It seems that an error occure while connecting to the server, please try to refresh the page pr go to Home.</Typography>
                <button className="button fit--width">
                    <Link to={"/"}>Go to Home</Link>
                </button>
            </Stack>
        </>
    )
}

export default ErrorHandler;