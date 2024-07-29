import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import useApiQuery from "@/hooks/useApiQuery";
import ProductDetailsCard from "@/components/ui/ProductDetailsCard";
import { Product } from "@/types";
import { Skeleton, Stack } from '@mui/material';


export const ProductDetails = ()=>{

    const {slug} = useParams()

    // Queries    
    const { data: categories, error, isLoading} = useApiQuery({
        queryKey: ["categories"],
        url: `/categories/${slug}`
    });

    return (
        <>
            <Helmet title="Products" />
            
            <Link to="./.." className="button return--btn">
                <ArrowBackIosIcon sx={{position: "relative", top: "3px", left:"4px", fontSize:"18px"}} />
                return to products
            </Link>

            {
                isLoading &&             
                <>
                    <Stack pt={9} alignItems="center" sx={{height: "90vh"}}>
                        <Skeleton variant="rectangular" width="70%" height="200px" />
                        <Stack direction="row" spacing={2} mt={3}>
                            <Skeleton variant="rectangular" width={120} height={70} />
                            <Skeleton variant="rectangular" width={120} height={70} />
                            <Skeleton variant="rectangular" width={120} height={70} />
                            <Skeleton variant="rectangular" width={120} height={70} />
                        </Stack>
                    </Stack>
                </>
            }

            {
                categories && categories.data && categories.data.products?.length > 0 &&
                    <AliceCarousel mouseTracking 
                    renderPrevButton={({isDisabled})=>
                        {
                            return <span className="arrow--background arrow--left" style={{opacity: isDisabled ? '0.5' : 1 }}>
                                    <ArrowBackIosIcon sx={{mr:"-5px",ml:"3px"}}/>
                            </span> 
                        }
                    }
                    renderNextButton={({isDisabled})=>
                        {
                            return <span className="arrow--background arrow--right" style={{opacity: isDisabled ? '0.5' : 1 }}>
                                    <ArrowForwardIosIcon />
                            </span> 
                        }
                    }
                    renderDotsItem={({activeIndex})=>{
                            return  <div className="related__products">
                                        <div className="image">
                                            <img src={categories.data.products[activeIndex].image} alt={categories.data.products[activeIndex].productName}/>
                                        </div>
                                    </div>
                        }
                    }
                    >
                        {
                            categories.data.products.map((product:Product) => <ProductDetailsCard productData={product} key={product.productID} />)
                        }
                </AliceCarousel>
            }

            {error && <p >{error.message}</p>} 
        </>
    )
}

