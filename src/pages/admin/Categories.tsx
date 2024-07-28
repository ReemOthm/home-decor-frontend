import { Box, Button, Pagination} from '@mui/material';
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import useApiQuery from "@/hooks/useApiQuery";
import CustomizedTables, { renderCategoriesTable, tableHead } from "./../../components/CustomizedTables";
import { CategoryData } from '@/data';
import { capitalizeTitle } from '@/lib/utils';
import { Category } from '@/types';
import { categorySchema } from '@/validation';
import api from '@/api';
import DeleteModal from '@/components/modals/DeleteModal';
import UpdateModal from '@/components/modals/UpdateModal';
import CreateModal from '@/components/modals/CreateModal';


export const Categories = ()=>{

    const [pageNumber, setPageNumber] = useState(1);

    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(!openCreate);

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(!openEdit);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(!openDelete);
    
    const [category, setCategory] = useState({
        categoryID: "",
        name: "",
        description: "",
        slug: "",
        createdAt: ""
    });

    const [categoryEdit, setCategoryEdit] = useState({
        categoryID: "",
        name: "",
        description: "",
        slug: "",
        createdAt: ""
    });

    useEffect(()=>{
        setCategory(categoryEdit);
    },[categoryEdit])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Category>({
        resolver: zodResolver(categorySchema)
    });
    
    const { data:categories, isLoading, error, refetch} = useApiQuery({
        queryKey: ["categories", `${pageNumber}`],
        url: `/categories/all?pageNumber=${pageNumber}&pageSize=6`
    });


    // ---------------------Handlers----------------------------
    const handlePageNumber = (event: React.ChangeEvent<unknown>,page: number)=> setPageNumber(page)

    const handleUpdateCategory = (e:ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = e.target;
        setCategoryEdit({...categoryEdit, [name]: value})
    }

    const handleDeleteCategory = async()=>{
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
            const { status } = await api.delete(`/categories/${category.categoryID}`)

            if(status === 200){
                toast.update(id, {render: "Category has deleted Successfully!", type: "success", isLoading: false,autoClose: 1000},);
                refetch()
            }
        }catch (error){
            console.log(error)
            const errorObject = error as AxiosError;
            toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 2000 });
        } 
    }

    const onSubmitCreate:SubmitHandler<Category> = async (data)=>{
        handleOpenCreate(); 
        
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
            const { status } = await api.post(`/categories`, data)
            
            if(status === 200){
                toast.update(id, {render:"Category Created Successfully", type: "success", isLoading: false,autoClose: 1000},);
                refetch()
                reset()
            }
        }catch (error){
            console.log(error)
            const errorObject = error as AxiosError;
            toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 2000 });
        } 
    }
    
    const onSubmit:SubmitHandler<Category> = async (data)=>{
        handleOpenEdit(); 
        
        const updatedCategory = {...data, createdAt: categoryEdit.createdAt}

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
            const { status } = await api.put(`/categories/${category.categoryID}`, updatedCategory)
            
            if(status === 200){
                toast.update(id, {render:"Category Updated Successfully", type: "success", isLoading: false,autoClose: 1000},);
                refetch()
            }
        }catch (error){
            console.log(error)
            const errorObject = error as AxiosError;
            toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 2000 });
        } 
    }

    // ----------------------Render-----------------------------
    const categoryFormCreate = CategoryData.map(({type, name}, index)=> 
        <div key={index}>
            <label htmlFor={name}>{capitalizeTitle(name)}</label>
            <input 
                className='input' 
                id={name}
                type={type} 
                {...register(name)} />
            {errors[name] && <p className='error--msg'>{errors[name]?.message}</p>}
        </div>
    )
    const categoryFormEdit = CategoryData.map(({type, name}, index)=> 
        <div key={index}>
            <label htmlFor={name}>{capitalizeTitle(name)}</label>
            <input 
                className='input' 
                id={name}
                type={type} 
                {...register(name)} 
                value={category[name]} 
                onChange={handleUpdateCategory} />
            {errors[name] && <p className='error--msg'>{errors[name]?.message}</p>}
        </div>
    )

    if(isLoading) return  <h1>Loading ....</h1>

    return (
        <>
            <button className='button fit--width margin--auto' onClick={handleOpenCreate}>Create Category</button>
            {
                categories && categories.data && categories.data?.items.length > 0 ?
                <CustomizedTables renderRows={renderCategoriesTable(categories.data.items,handleOpenEdit, setCategoryEdit, handleOpenDelete)} columns={tableHead.categories}  /> 
                :
                <div>
                    <p className="no--found">No Categories found</p>
                </div>  
            }

            <CreateModal openCreate={openCreate} handleopenCreate={handleOpenCreate} handleSubmit={handleSubmit(onSubmitCreate)} formElement={categoryFormCreate}/>
            <UpdateModal openUpdate={openEdit} handleOpenUpdate={handleOpenEdit} handleSubmit={handleSubmit(onSubmit)} formElement={categoryFormEdit}/>
            <DeleteModal openDelete={openDelete} handleOpenDelete={handleOpenDelete} handleDelete={handleDeleteCategory} />
            
            <Box sx={{width: "200px", margin: "40px auto"}}>
                <Pagination count={categories.data.totalPages} variant="outlined" 
                    page={pageNumber} color="secondary" onChange={handlePageNumber} 
                />
            </Box>
            
            { error && <p>{error.message}</p> }
        </>
    )
}