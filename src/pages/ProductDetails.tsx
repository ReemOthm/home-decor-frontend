import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Skeleton, Stack } from '@mui/material';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import ProductDetailsCard from "@/components/ui/ProductDetailsCard";
import { Product } from "@/types";
import { AppDispatch } from '@/app/store';
import { fetchCategories } from '@/app/features/categorySlice';

export const ProductDetails = ()=>{

    const {slug} = useParams()

    const dispatch = useDispatch<AppDispatch>()
    const [error, isLoading, categories] = useSelector((state:any)=> [
        state.categoryRoducer.error,
        state.categoryRoducer.isLoading,
        state.categoryRoducer.categories
    ], shallowEqual)

    useEffect(()=>{
        dispatch(fetchCategories(`${slug}`))
    },[dispatch])

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
                            <Skeleton variant="rectangular" sx={{width: {sm: 65, md:120}, height: {sm:50, md:70}}} />
                            <Skeleton variant="rectangular" sx={{width: {sm: 65, md:120}, height: {sm:50, md:70}}}  />
                            <Skeleton variant="rectangular" sx={{width: {sm: 65, md:120}, height: {sm:50, md:70}}}  />
                            <Skeleton variant="rectangular" sx={{width: {sm: 65, md:120}, height: {sm:50, md:70}}}  />
                        </Stack>
                    </Stack>
                </>
            }

            {
                categories && categories.products?.length > 0 &&
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
                    renderDotsItem={({activeIndex, isActive})=>{
                            return  <div className="related__products">
                                        <img style={{ opacity: isActive? 1: 0.5}} src={categories.products[activeIndex].image} alt={categories.products[activeIndex].productName}/>
                                    </div>
                        }
                    }
                    >
                        {
                            categories.products.map((product:Product) => <ProductDetailsCard productData={product} key={product.productID} />)
                        }
                </AliceCarousel>
            }

            {error && <p >{error}</p>} 
        </>
    )
}

