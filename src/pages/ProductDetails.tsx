import { useParams } from "react-router-dom"

export const ProductDetails = ()=>{

    const {slug} = useParams<{slug:string}>()
    return (
        <>

        </>
    )
}

