import { Box, Pagination, Skeleton} from '@mui/material';
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import CustomizedTables, { tableHead } from "./../../components/CustomizedTables";
import { CategoryData } from '@/data';
import { capitalizeTitle } from '@/lib/utils';
import { Category } from '@/types';
import { categorySchema } from '@/validation';
import DeleteModal from '@/components/modals/DeleteModal';
import CreateModal from '@/components/modals/CreateModal';
import { AppDispatch } from '@/app/store';
import { createCategory, deleteCategory, fetchCategoriesAll, updateCategory } from '@/app/features/categorySlice';
import { CategoriesTable } from '@/components/tables/CategoriesTable';

export const Categories = ()=>{

    const [pageNumber, setPageNumber] = useState(1);

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [categoryId, setCategoryId] = useState("");

    const [categoryEdit, setCategoryEdit] = useState({
        categoryID: "",
        name: "",
        description: "",
        slug: "",
        createdAt: ""
    });

    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => {
        reset()
        setOpenCreate(false);
    }

    const handleOpenEdit = () => setOpenEdit(true);

    const handleCloseEdit = ()=>{
        setOpenEdit(false)
        reset()
    }
    
    const handleOpenDelete = () => setOpenDelete(!openDelete);

    const dispatch = useDispatch<AppDispatch>()
    const [error, totalPages, isLoading, categories] = useSelector((state:any)=> [
        state.categoryRoducer.error,
        state.categoryRoducer.totalPages, 
        state.categoryRoducer.isLoading,
        state.categoryRoducer.categories
    ], shallowEqual)
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Category>({
        resolver: zodResolver(categorySchema)
    });

    useEffect(()=>{
        dispatch(fetchCategoriesAll(pageNumber.toString()))
    },[pageNumber])

    // ---------------------Handlers----------------------------
    const handlePageNumber = (event: React.ChangeEvent<unknown>,page: number)=> setPageNumber(page)

    const handleUpdateCategory = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> )=> {
        const {name, value} = e.target;
        setCategoryEdit(categoryEdit=>({...categoryEdit, [name]: value}))
    }

    const handleDeleteCategory = async()=>{
        handleOpenDelete();
        dispatch(deleteCategory(categoryId))
        setCategoryId("")
    }

    const onSubmitCreate:SubmitHandler<Category> = async (data)=>{
        dispatch(createCategory(data))
        dispatch(fetchCategoriesAll(pageNumber.toString()))
        handleCloseCreate(); 
    }
    
    const onSubmitUpdate:SubmitHandler<Category> = async (data)=>{
        const updatedCategory:Category = {
            ...categoryEdit,
            name: data.name,
            description: data.description,
            products: []
        }
        dispatch(updateCategory(updatedCategory))
        handleCloseEdit(); 
    }

    // ----------------------Render-----------------------------
    const categoryFormCreate = CategoryData.map(({type, name}, index)=> 
        <div key={index}>
            <label htmlFor={name}>{capitalizeTitle(name)}</label>
            <input 
                className='input' 
                id={name}
                type={type} 
                {...register(name)} 
            />
            {errors[name] && <p className='error--msg'>{errors[name]?.message}</p>}
        </div>
    )

    const categoryFormEdit = CategoryData.map(({type, name}, index)=> 
        <div key={index}>
            <label htmlFor={name}>{capitalizeTitle(name)}</label>
            {
                name == "description" ? 
                <textarea     
                    className='input'            
                    id={name}
                    {...register(name)} 
                    value={categoryEdit[name]} 
                    onChange={handleUpdateCategory}>
                </textarea>
                : 
                <input 
                    className='input' 
                    id={name}
                    type={type} 
                    {...register(name)} 
                    value={categoryEdit[name]} 
                    onChange={handleUpdateCategory} 
                />
            }
            {errors[name] && <p className='error--msg'>{errors[name]?.message}</p>}
        </div>
    )

    if(isLoading) return <div>
        <Skeleton variant="rectangular" width="200px" height={30} sx={{m:"40px auto" }}/>
        <Skeleton variant="rectangular" width="100%" height={118} />
    </div>

    return (
        <>
            <button className='button fit--width margin--auto' onClick={handleOpenCreate}>Create Category</button>
            {
                categories && categories.length > 0 ?
                <CustomizedTables renderRows={CategoriesTable(categories,handleOpenEdit, setCategoryEdit, setCategoryId, handleOpenDelete)} columns={tableHead.categories}  /> 
                :
                <div>
                    <p className="no--found">No Categories found</p>
                </div>  
            }

            <CreateModal btnName='Create' open={openCreate} close={handleCloseCreate} handleSubmit={handleSubmit(onSubmitCreate)} formElement={categoryFormCreate} scroll={false}/>
            <CreateModal btnName='Update' open={openEdit} close={handleCloseEdit} handleSubmit={handleSubmit(onSubmitUpdate)} formElement={categoryFormEdit} scroll={false}/>
            <DeleteModal item='category' openDelete={openDelete} handleOpenDelete={handleOpenDelete} handleDelete={handleDeleteCategory} /> 
            
            <Box sx={{width: "200px", margin: "40px auto"}}>
                <Pagination count={totalPages} variant="outlined" 
                    page={pageNumber} color="secondary" onChange={handlePageNumber} 
                />
            </Box>
            
            { error && <p className='no--found'>{error}</p> }
        </>
    )
}