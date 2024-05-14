import { Helmet } from "react-helmet";

const PageTitle = (title:string)=>{
    return (
        <Helmet>{title}</Helmet>
    )
}

export default PageTitle;