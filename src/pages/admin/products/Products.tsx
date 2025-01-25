import { useEffect, useRef, useState } from "react";
import api from "@/api";
import { Box, Button, CardActions, Grid, Pagination, Skeleton, Stack } from "@mui/material";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import CreateModal from "@/components/modals/CreateModal";
import DeleteModal from "@/components/modals/DeleteModal";
import ProductCard from "@/components/ui/ProductCard";
import useApiQuery from "@/hooks/useApiQuery";
import { Product } from "@/types";
import { productSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import UpdateModal from "@/components/modals/UpdateModal";
import ProductFormEdit from "./ProductFormEdit";
import ProductForm from "./ProductForm";

export const Products = ()=>{

    const keyword = useRef<HTMLInputElement>(null);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Product>({
        resolver: zodResolver(productSchema)
    });

    const initailProduct : Product = {
        productID: '',
        productName: '',
        description: '',
        image: '',
        imageFile: '',
        slug: '',
        category: {
            categoryID: "",
            name: "",
            description: "",
            slug: "",
            products: [],
            createdAt: ""
        },
        categoryName: '',
        colors: [],
        color: '',
        price: 0,
        quantity: 0,
        createdAt: ""
    }
    
    const [pageNumber, setPageNumber] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<string | null>(null);
    const [product, setProduct] = useState(initailProduct)

    const [productToEdit, setProductToEdit] = useState(initailProduct)

    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    
    // useEffect(()=>{
    //     setProductToEdit(product);
    // },[product])
    
    // Queries
    const { data, error, isLoading , refetch} = useApiQuery({
        queryKey: ["products", `${pageNumber}`, `${searchKeyword}`],
        url: `/products?keyword=${searchKeyword}&page=${pageNumber}&pageSize=8`
    });
    
    // ------------------HANDLERS-------------------------
    const handlePageNumber = (event: React.ChangeEvent<unknown>,page: number)=> setPageNumber(page)
    const handleOpenCreate = () => setOpenCreate(!openCreate);
    const handleOpenEdit = () => setOpenEdit(!openEdit);
    const handleOpenDelete = () => setOpenDelete(!openDelete);
    
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

    const handleDeleteProduct = async()=>{
        handleOpenDelete();

        const id = toast.loading("Please wait...", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        try{
            const { status } = await api.delete(`/products/${product.productID}`)

            if(status === 200){
                toast.update(id, {render: "Product has deleted Successfully!", type: "success", isLoading: false,autoClose: 1000},);
                refetch()
                setProduct(initailProduct)
            }
        }catch (error){
            console.log(error)
            const errorObject = error as AxiosError;
            toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 2000 });
        } 
    }

    const handleEdit = (product:Product)=>{
        handleOpenEdit()
        setProductToEdit(product)
    }
    
    // const handleUpdateCategory = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> )=> {
    //     const {name, value} = e.target;
    //     setCategoryEdit({...categoryEdit, [name]: value})
    // }

    // ------------------Submit Handlers------------------------
    const onSubmitCreate:SubmitHandler<Product> = async (data)=>{
        handleOpenCreate(); 
        console.log(data)

        const product = { 
            ...data, 
            image: imageFile, 
            colors: data.color.split(" "),
        };

        console.log(product)
        
        const id = toast.loading("Please wait...", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        
        try{
            const { status } = await api.post(`/products`, product)
            
            if(status === 200){
                toast.update(id, {render:"Product Created Successfully", type: "success", isLoading: false,autoClose: 1000},);
                refetch()
                reset()
            }
        }catch (error){
            console.log(error)
            const errorObject = error as AxiosError;
            toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 2000 });
        } 
    }

    const onSubmitEdit:SubmitHandler<Product> = async (data)=>{
        handleOpenEdit(); 
        
        const updatedProduct = {...data}
                console.log(data)
        // const id = toast.loading("Please wait...", {
        //     position: "top-center",
        //     autoClose: 1000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
        
        // try{
        //     const { status } = await api.put(`/products/${product.productID}`, updatedProduct)
            
        //     if(status === 200){
        //         toast.update(id, {render:"Product Updated Successfully", type: "success", isLoading: false,autoClose: 1000},);
        //         refetch()
        //         // setProduct
        //     }
        // }catch (error){
        //     console.log(error)
        //     const errorObject = error as AxiosError;
        //     toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 2000 });
        // } 
    }

    // ----------------------Render-----------------------------

    if(isLoading) return (
        <>
            <Box className="filter__menu" m="4px">
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
            {
                data && 
                <>
                    <Box className="filter__menu" mr={2}>
                        <Button sx={{fontSize: 11, ml: 2, backgroundColor: "#b85454", "&:hover": {backgroundColor: "#943e3e"}}} variant="contained" 
                            onClick={handleOpenCreate}
                        >Create Product</Button>
                    <form className="filter__search" onSubmit={handleSearch}>
                            <input type="search" ref={keyword} placeholder="What are you looking for?"/>
                            <input type="submit" value="search" />
                        </form>
                    </Box>

                    { data.items.length > 0 ?
                        <>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 8 }} justifyContent="center"  p="10px">              
                                { data.items.map((product:Product) => ( 
                                <Grid item xs={2} sm={2} md={2} key={product.productID}>
                                    <ProductCard product={product}displayButtons={false}>
                                        <CardActions sx={{py:2}}>
                                            <Button fullWidth  sx={{fontSize: 11, backgroundColor: "#999", "&:hover": {backgroundColor: "#444"}}} variant="contained"  size="small"
                                                onClick={()=>handleEdit(product)}
                                            >Edit</Button>
                                            <Button fullWidth sx={{fontSize: 11, padding: "4px 10px", margin : 0, backgroundColor: "#b81f1f", "&:hover": {backgroundColor: "#ca2828"}}} variant="contained"
                                                size="small"
                                                onClick={()=>{
                                                    handleOpenDelete()
                                                    setProduct(product)
                                                }}
                                            >
                                                Delete 
                                            </Button>
                                        </CardActions>    
                                    </ProductCard> 
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


                    <CreateModal scroll={true} openCreate={openCreate} handleopenCreate={handleOpenCreate} handleSubmit={handleSubmit(onSubmitCreate)} 
                        formElement={<ProductForm register={register} errors={errors} imagePreview={imagePreview} setImagePreview={setImagePreview} 
                        setImageFile={setImageFile}
                        />}
                    />

                    <UpdateModal scroll={true} openUpdate={openEdit} handleOpenUpdate={handleOpenEdit} handleSubmit={handleSubmit(onSubmitEdit)} formElement={
                        <ProductFormEdit register={register} errors={errors} imagePreview={imagePreview} setImagePreview={setImagePreview} 
                        setImageFile={setImageFile} productToEdit={productToEdit}
                        />
                    }/>


                    <DeleteModal item='product' openDelete={openDelete} handleOpenDelete={handleOpenDelete} handleDelete={handleDeleteProduct} />

                </>
            }

            {error && <p >{error.message}</p>} 
        </>
    )
}
