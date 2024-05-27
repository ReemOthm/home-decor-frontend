import { Stack, Typography} from '@mui/material';
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import useApiQuery from "@/hooks/useApiQuery";
import CustomizedTables, { renderCategoriesTable, tableHead } from "./../../components/CustomizedTables";
import { BasicModal } from "@/components/Modal";
import { CategoryData } from '@/data';
import { capitalizeTitle } from '@/lib/utils';
import { Category } from '@/types';
import { categorySchema } from '@/validation';
import api from '@/api';


export const Categories = ()=>{

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Category>({
        resolver: zodResolver(categorySchema)
    });
    
    const { data:categories, isLoading, error, refetch} = useApiQuery({
        queryKey: ["categories"],
        method: "get" ,
        url: `/categories`
    });


    // ---------------------Handlers----------------------------
    const handleUpdateCategory = (e:ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = e.target;
        setCategory({...category, [name]: value})
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

    const onSubmit:SubmitHandler<Category> = async (data) =>{
        handleOpenEdit(); 

        const updatedCategory = {...data, createdAt: category.createdAt}

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
                toast.update(id, {render: "Category has updated Successfully!", type: "success", isLoading: false,autoClose: 1000},);
                refetch()
            }
        }catch (error){
            console.log(error)
            const errorObject = error as AxiosError;
            toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 2000 });
        } 
    }

    // ----------------------Render-----------------------------
    const categoryForm = CategoryData.map(({type, name}, index)=> 
        <div key={index}>
            <label htmlFor={name}>{capitalizeTitle(name)}</label>
            <input 
                className='input' 
                id={name}
                disabled = {name == 'createdAt' || name == 'slug'} 
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
            {
                categories && categories.data.length > 0 &&
                <CustomizedTables renderRows={renderCategoriesTable(categories.data,handleOpenEdit, setCategory, handleOpenDelete)} columns={tableHead.categories}  /> 
            }

            <BasicModal open={openEdit} handleOpen={handleOpenEdit}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        {categoryForm}
                        <Stack direction ="row">
                            <button >Update</button>
                            <button type='button' onClick={handleOpenEdit}>Cancel</button>
                        </Stack>
                    </Stack>
                </form>
            </BasicModal>
            {/* Model for Delete */}
            <BasicModal open={openDelete} handleOpen={handleOpenDelete}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete Category
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You are about to delete category. Are you sure to delete?
                </Typography>
                <Stack direction ="row">
                    <button onClick={handleDeleteCategory}>Delete</button>
                    <button type='button' onClick={handleOpenDelete}>Cancel</button>
                </Stack>
            </BasicModal>

            {error && <p>{error.message}</p>}
        </>
    )
}