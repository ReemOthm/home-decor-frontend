import { Autocomplete, Box, Button, Grid, Pagination, Stack, TextField } from "@mui/material";
import { Helmet } from "react-helmet";
import { useRef, useState } from "react";

import useApiQuery from "./../hooks/useApiQuery";
import ProductCard from "@/components/ui/ProductCard";
import { Category, Product } from "@/types";

export const Products = ()=>{

    const [pageNumber, setPageNumber] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const keyword = useRef<HTMLInputElement>(null);

    // Queries
    const { data, error, isLoading } = useApiQuery({
        queryKey: ["products", `${pageNumber}`, `${searchKeyword}`, `${category}`],
        method: "get" ,
        url: `/products?keyword=${searchKeyword}&category=${category}&page=${pageNumber}`
    });

    const { data: categories} = useApiQuery({
        queryKey: ["categories"],
        method: "get" ,
        url: `/categories`
    });

    const categoryOptions = categories != null ? [{name: "All"}, ...categories.data] : null

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
        
        if(value != null)
            setCategory(value)

        if(value == "All")
            setCategory("")
    }


    if(isLoading) return <h1>Products are loading</h1>

    return (
        <>
            <Helmet title="Products" />
            {
                data && 
                <>
                    <Stack direction="row" justifyContent="space-between">
                        <form className="search" onSubmit={handleSearch}>
                            <input type="search" ref={keyword}/>
                            <input type="submit" value="search" />
                        </form>

                    { categoryOptions && categoryOptions.length > 0 &&
                        <Autocomplete 
                            sx={{width: "200px"}}
                            onChange={handleFilterByCategory}
                            size= "small"
                            options={categoryOptions.map((category) => category.name)}
                            renderInput={(params) => (
                            <TextField 
                                {...params}
                                label="Filter by Category"
                                InputProps={{
                                ...params.InputProps,
                                }}
                            />
                            )}
                        />
                    }    
                    </Stack>

                    { data.items.length > 0 ?
                        <>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 5, md: 7 }} justifyContent="center">                
                                { data.items.map((product:Product) => ( 
                                <Grid item xs={2} sm={2} md={2} key={product.productID}>
                                    <ProductCard product={product}  /> 
                                </Grid>
                                ))}
                            </Grid>
                            
                            <Box sx={{width: "fit-content", margin: "40px auto"}}>
                                <Pagination count={data.totalPages} variant="outlined" 
                                    page={pageNumber} color="secondary" onChange={handlePageNumber} 
                                />
                            </Box>
                        </>
                        : 
                            <div>
                                <p className="no--product">No products found</p>
                            </div>                    
                    }
                    { searchKeyword && 
                        <Stack justifyContent="center" alignItems="center">
                            <Button size="small" variant="contained" 
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

