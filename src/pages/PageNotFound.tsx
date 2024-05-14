import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const PageNotFound = ()=>{
    return (
        <div>
            <Helmet title="Page Not Found" />
            <h1>404</h1>
            <p>Page not Found</p>
            <Button>
                {/* <Link to={"/"}>Go to Home</Link> */}
            </Button>
        </div>
    )
}

export default PageNotFound;