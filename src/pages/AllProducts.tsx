import { Autocomplete, Box, Button, Grid, Pagination, Stack, TextField } from "@mui/material";
import { Helmet } from "react-helmet";
import { useRef, useState } from "react";

import useApiQuery from "./../hooks/useApiQuery";
import ProductCard from "@/components/ui/ProductCard";
import { Price, Product } from "@/types";

export const AllProducts = ()=>{

    const [pageNumber, setPageNumber] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<Price>({
        maxPrice: "",
        minPrice: ""
    });

    const keyword = useRef<HTMLInputElement>(null);

    // Queries
    const { data, error, isLoading } = useApiQuery({
        queryKey: ["products", `${pageNumber}`, `${searchKeyword}`, `${category}`, `${price.maxPrice}`, `${price.minPrice}`],
        url: `/products?keyword=${searchKeyword}&category=${category}&minPrice=${price.minPrice}&maxPrice=${price.maxPrice}&page=${pageNumber}&pageSize=8`
    });

    const { data: categories} = useApiQuery({
        queryKey: ["categories"],
        url: `/categories`
    });

    const categoryOptions = categories != null && categories.data.length > 0 && [{name: "All"}, ...categories.data]

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

    if(isLoading) return <h1>Products are loading</h1>

    return (
        <>
            <Helmet title="Products" />
            {
                data && 
                <>
                    <div  className="filter__menu">
                        <form className="search" onSubmit={handleSearch}>
                            <input type="search" ref={keyword} placeholder="What are you looking for?"/>
                            <input type="submit" value="search" />
                        </form>

                        <Stack direction="row" gap={1}>
                            <Autocomplete 
                                className="filter"
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
                                            fontSize: 15,
                                        },
                                    }}
                                />
                                )}
                            />

                            { categoryOptions && categoryOptions.length > 0 &&
                                <Autocomplete 
                                    className="filter"
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
                                                fontSize: 15,
                                            },
                                        }}
                                    />
                                    )}
                                />
                            }  
                        </Stack>
                    </div>

                    { data.items.length > 0 ?
                        <>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 8 }} justifyContent="center">                
                                { data.items.map((product:Product) => ( 
                                <Grid item xs={2} sm={2} md={2} key={product.productID}>
                                    <ProductCard product={product}  /> 
                                </Grid>
                                ))}
                            </Grid>
                            
                            <Box sx={{  width: "200px;", margin: "40px auto"}}>
                                <Pagination count={data.totalPages} variant="outlined" shape="rounded"
                                    page={pageNumber} onChange={handlePageNumber} 
                                />
                            </Box>
                        </>
                        : 
                            <div>
                                <p className="no--found">No products found</p>
                            </div>                    
                    }
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
            }

            {error && <p >{error.message}</p>} 
        </>
    )
}

