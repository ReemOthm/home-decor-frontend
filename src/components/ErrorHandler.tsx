import { Helmet } from "react-helmet";

const ErrorHandler = ()=>{
    return (
        <>
            <Helmet title= "Error " />
            <p>An error occure</p>
        </>
    )
}

export default ErrorHandler;