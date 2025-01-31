import { ChangeEvent, useEffect, useRef, useState } from "react";import { Box, Button, CardActions, Grid, Pagination, Skeleton, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import CreateModal from "@/components/modals/CreateModal";
import DeleteModal from "@/components/modals/DeleteModal";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";
import { productSchema } from "@/validation";
import ProductFormEdit from "./ProductFormEdit";
import ProductForm from "./ProductForm";
import { AppDispatch } from "@/app/store";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "@/app/features/productSlice";
import { fetchCategories } from "@/app/features/categorySlice";

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
    
    const [product, setProduct] = useState<string>("") 
    const [pageNumber, setPageNumber] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string>("");
    const [imageFile, setImageFile] = useState<File|string>("");
    const [productToEdit, setProductToEdit] = useState(initailProduct)

    const [openCreate, setOpenCreate] = useState(false); 
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const dispatch = useDispatch<AppDispatch>()
    const [error, totalPages, products, isLoading, categories] = useSelector((state:any)=> [
        state.productRoducer.error,
        state.productRoducer.totalPages, 
        state.productRoducer.products, 
        state.productRoducer.isLoading,
        state.categoryRoducer.categories
    ], shallowEqual)

    useEffect(()=>{
        dispatch(fetchProducts({
            category: "",
            searchKeyword,
            minPrice: "", 
            maxPrice:"", 
            pageNumber:pageNumber.toString()}
        ))
        dispatch(fetchCategories(""))
    },[pageNumber, searchKeyword])
        
    // ------------------HANDLERS-------------------------
    const handlePageNumber = (event: React.ChangeEvent<unknown>,page: number)=> {
        setPageNumber(page)
    }
    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => {
        setOpenCreate(false);
        reset()
        setImagePreview("")
        setImageFile("")
    }

    const handleOpenEdit = (product:Product) =>{
        setOpenEdit(true);
        setProductToEdit(product)
        setImagePreview(product.image)
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
        reset()
        setImagePreview("")
        setImageFile("")
    }

    const handleChangeUpdate = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        const {name, value} = e.target;
        setProductToEdit({...productToEdit, [name]: value})
    }    
    
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
    
    const handleOpenDelete = () => setOpenDelete(!openDelete);
    const handleDeleteProduct = async()=>{
        handleOpenDelete();
        dispatch(deleteProduct(product))
        setProduct("")
    }
    
    // ------------------Submit Handlers------------------------
    const onSubmitCreate:SubmitHandler<Product> = async (data)=>{
        handleCloseCreate(); 
        const formData = new FormData()
        formData.append("file", imageFile)
        formData.append("upload_preset", 'react_ecommerce')
        formData.append('cloud_name',import.meta.env.VITE_CLOUDNAME)
        const res = await fetch(import.meta.env.VITE_CLOUDURL,{
            method:"POST",
            body: formData
        })
        const uploadedImageUrl = await res.json()
        const product = { 
            ...data, 
            image: uploadedImageUrl.url, 
            colors: data.color.split(" "),
        };
        await dispatch(createProduct(product))
        reset()
        setImagePreview("")
        setImageFile("")
    }

    const onSubmitEdit:SubmitHandler<Product> = async (data)=>{
        handleCloseEdit(); 
        if(imagePreview !== productToEdit.image){
            const formData = new FormData()
            formData.append("file", imageFile)
            formData.append("upload_preset", 'react_ecommerce') 
            formData.append('cloud_name', import.meta.env.VITE_CLOUDNAME) 
            const res = await fetch(import.meta.env.VITE_CLOUDURL,{
                method:"POST",
                body: formData
            })
            const uploadedImageUrl = await res.json()
            const updatedProduct = {
                ...productToEdit, 
                categoryName: data.categoryName,
                image: uploadedImageUrl.url,
            }
            await dispatch(updateProduct(updatedProduct))
        } else{
            const updatedProduct = {
                ...productToEdit, 
                categoryName: data.categoryName,
            }
            await dispatch(updateProduct(updatedProduct))
        }
        reset()
        setImagePreview("")
        setImageFile("")
        setProductToEdit(initailProduct)
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
                products && 
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

                    { products.length > 0 ?
                        <>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 8 }} justifyContent="center"  p="10px">              
                                { products.map((product:Product) => ( 
                                <Grid item xs={2} sm={2} md={2} key={product.productID}>
                                    <ProductCard product={product}displayButtons={false}>
                                        <CardActions sx={{py:2}}>
                                            <Button fullWidth  sx={{fontSize: 11, backgroundColor: "#444", "&:hover": {backgroundColor: "#999"}}} variant="contained"  size="small"
                                                onClick={()=>handleOpenEdit(product)}
                                            >Edit</Button>
                                            <Button fullWidth sx={{fontSize: 11, padding: "4px 10px", margin : 0, backgroundColor: "#b81f1f", "&:hover": {backgroundColor: "#ca2828"}}} variant="contained"
                                                size="small"
                                                onClick={()=>{
                                                    handleOpenDelete()
                                                    setProduct(product.productID)
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
                                <Pagination count={totalPages} variant="outlined" shape="rounded"
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

                    <CreateModal btnName="Create" scroll={true} open={openCreate} close={handleCloseCreate} handleSubmit={handleSubmit(onSubmitCreate)} 
                        formElement={<ProductForm categories={categories} register={register} errors={errors} imagePreview={imagePreview} setImagePreview={setImagePreview} 
                        setImageFile={setImageFile}
                        />}
                    />
                    
                    <CreateModal btnName="Update" scroll={true} open={openEdit} close={handleCloseEdit} handleSubmit={handleSubmit(onSubmitEdit)} 
                        formElement={<ProductFormEdit handleChangeUpdate={handleChangeUpdate} register={register} errors={errors} imagePreview={imagePreview} setImagePreview={setImagePreview} 
                            setImageFile={setImageFile} productToEdit={productToEdit}
                        />}
                    />

                    <DeleteModal item='product' openDelete={openDelete} handleOpenDelete={handleOpenDelete} handleDelete={handleDeleteProduct} />

                </>
            }

            {error && <p className="no--found">{error}</p>} 
        </>
    )
}
