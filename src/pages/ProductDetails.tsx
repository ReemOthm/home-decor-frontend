import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import useApiQuery from "@/hooks/useApiQuery";
import ProductDetailsCard from "@/components/ui/ProductDetailsCard";
import { Product } from "@/types";


export const ProductDetails = ()=>{

    const {slug} = useParams()

    // Queries    
    const { data: categories, error, isLoading} = useApiQuery({
        queryKey: ["categories"],
        url: `/categories/${slug}`
    });
    
    if(isLoading) return <h1>Product is loading</h1>

    return (
        <>
            <Helmet title="Products" />
            
            <Link to="./.." className="button return--btn">
                <ArrowBackIosIcon sx={{position: "relative", top: "3px", left:"4px", fontSize:"18px"}} />
                return to products
            </Link>

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
                                            <img src={categories.data.products[activeIndex].image}/>
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

