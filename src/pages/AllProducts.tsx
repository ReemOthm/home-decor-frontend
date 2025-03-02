import { Autocomplete, Box, Button, Grid, Pagination, Skeleton, Stack, TextField } from "@mui/material";
import { Helmet } from "react-helmet";
import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import ProductCard from "@/components/ui/ProductCard";
import { Price, Product } from "@/types";
import { AppDispatch } from "@/app/store";
import { fetchProducts } from "@/app/features/productSlice";
import { fetchCategories } from "@/app/features/categorySlice";

export const AllProducts = ()=>{ 

    const dispatch = useDispatch<AppDispatch>()
    const [error, totalPages, products, isLoading, categories] = useSelector((state:any)=> [
        state.productRoducer.error,
        state.productRoducer.totalPages, 
        state.productRoducer.products, 
        state.productRoducer.isLoading,
        state.categoryRoducer.categories
    ], shallowEqual)

    const [pageNumber, setPageNumber] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<Price>({
        maxPrice: "",
        minPrice: ""
    });

    useEffect(()=>{
        dispatch(fetchProducts({
            category, 
            searchKeyword, 
            minPrice: price.minPrice.toString(), 
            maxPrice:price.maxPrice.toString(), 
            pageNumber:pageNumber.toString()}
        ))
        dispatch(fetchCategories(""))
    },[dispatch, pageNumber, searchKeyword, price, category])

    const keyword = useRef<HTMLInputElement>(null);

    const categoryOptions = categories != null && categories.length > 0 && [{name: "All"}, ...categories]

    const priceOptions = ["All","Less than 100", "Greater than 100"]

    const handlePageNumber = (event: React.ChangeEvent<unknown>,page: number)=> setPageNumber(page)

    const handleSearch = (e: React.ChangeEvent<HTMLFormElement>)=> {
        e.preventDefault()
        if(keyword?.current?.value != null){
            setPageNumber(1);
            setSearchKeyword(keyword.current.value)
        }
    }

    const handleCloseSearch = ()=> { 
        setSearchKeyword(""); 
        setPageNumber(1);
    }

    const handleFilterByCategory = (event: React.SyntheticEvent<Element, Event>, value: string | null)=> {
        setPageNumber(1)
        if(value != null) setCategory(value)
        if(value == "All") setCategory("")
    }

    const handleFilterByPrice = (event: React.SyntheticEvent<Element, Event>, value: string | null)=> {
        setPageNumber(1)
        switch(value){
            case "All": setPrice({maxPrice: "", minPrice: ""}) 
            break;
            case "Less than 100": setPrice({maxPrice: 100, minPrice: ""}) 
            break
            case "Greater than 100": setPrice({maxPrice: "", minPrice: 100}) 
        }
    }

    if(isLoading == true) return (
        <>
            <Box className="filter__menu" mt={4} mb={4}>
                <Skeleton variant="rectangular" width={210} height={23} />
                <Stack direction="row" gap={1} mt={1}>
                    <Skeleton variant="rectangular" width="150px" height={20} />
                    <Skeleton variant="rectangular" width="150px" height={20} />
                </Stack>
            </Box>
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 6, md: 8 }} justifyContent="center"
                sx={{
                    height: "90vh",
                }}
            >                
            { Array.from(new Array(8)).map((e,index) => ( 
                <Grid item xs={2} sm={2} md={2} key={index}>
                    <Skeleton variant="rectangular" width="100%" height={118} />
                    <Skeleton width="30%" />
                    <Skeleton width="80%" />
                    <Stack direction="row" spacing={1} >
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="circular" width={20} height={20} />
                    </Stack>
                    <Stack direction="row" spacing={1} mt={1}>
                        <Skeleton variant="rounded" width="40%" height={20} />
                        <Skeleton variant="rounded" width="40%" height={20} />
                    </Stack>
                </Grid>
                ))
            }
            </Grid>
        </>
    )

    return (
        <>
            <Helmet title="Products" />
            
            <div  className="filter__menu">
                <form className="filter__search" onSubmit={handleSearch}>
                    <input type="search" ref={keyword} placeholder="What are you looking for?"/>
                    <input type="submit" value="search" />
                </form>

                <Stack direction="row" gap={1} width={300}>
                    <Autocomplete 
                        className="filter__products"
                        onChange={handleFilterByPrice}
                        size= "small"
                        options={priceOptions.map((price) => price)}
                        renderInput={(params) => (
                        <TextField 
                            {...params}
                            placeholder="Filter by Price"
                            InputProps={{
                                ...params.InputProps,
                                style: { 
                                    fontSize: 10,
                                },
                            }}
                        />
                        )}
                    />

                    { categoryOptions && categoryOptions.length > 0 &&
                        <Autocomplete 
                            className="filter__products"
                            onChange={handleFilterByCategory}
                            size= "small"
                            options={categoryOptions.map((category) => category.name)}
                            renderInput={(params) => (
                            <TextField 
                                {...params}
                                placeholder="Filter by Category"
                                InputProps={{
                                    ...params.InputProps,
                                    style: { 
                                        fontSize: 10,
                                    },
                                }}
                            />
                            )}
                        />
                    }  
                </Stack>
            </div>
                { products && products.length > 0 ?
                    <>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 8 }} justifyContent="center">                
                            { products.map((product:Product) => ( 
                            <Grid item xs={2} sm={2} md={2} key={product.productID}>
                                <ProductCard product={product} /> 
                            </Grid>
                            ))}
                        </Grid>
                        
                        <Box sx={{ width: "200px;", margin: "40px auto"}}>
                            <Pagination count={totalPages} variant="outlined" shape="rounded"
                                page={pageNumber} onChange={handlePageNumber} 
                            />
                        </Box>
                        
                        { searchKeyword && 
                            <Stack justifyContent="center" alignItems="center" mb={4}>
                                <Button size="small" variant="contained" 
                                sx={{backgroundColor: "#b85454", "&:hover": {backgroundColor: "#943e3e"}}}
                                onClick={handleCloseSearch}>
                                    Return to Products Page 
                                </Button>
                            </Stack>
                        }
                    </>
                : 
                    <div>
                        <p className="no--found">No products found</p>
                    </div>                    
            }
            {error && <p >{error}</p>} 
        </>
    )
}

