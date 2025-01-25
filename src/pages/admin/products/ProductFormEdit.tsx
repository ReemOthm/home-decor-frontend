import { Autocomplete, Stack, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

import { Category, Product } from "@/types";
import useApiQuery from "@/hooks/useApiQuery";

interface IProductForm {
    register: UseFormRegister<Product>,
    errors: FieldErrors<Product>,
    imagePreview: string | null,
    setImagePreview: Dispatch<SetStateAction<string | null>>,
    setImageFile: Dispatch<SetStateAction<string | null>>,
    productToEdit: Product
}

const ProductFormEdit = ({register, errors, imagePreview, setImagePreview, setImageFile, productToEdit}: IProductForm)=>{

    const { data: categories} = useApiQuery({
        queryKey: ["categories"],
        url: `/categories`
    });

    const handleImageChange = (files: FileList|null)=>{
        if(files){
            setImagePreview(URL.createObjectURL(files?.[0]))

            const fileRef = files[0] || '';
            const fileType:string = fileRef.type || '';
            const reader = new FileReader(); 
            reader.readAsBinaryString(fileRef);
            reader.onload = (ev:any)=> {
                setImageFile(`data:${fileType};base64,${btoa(ev.target.result)}`);
            }

        }
    }

    return (
        <>
            <Stack spacing={2}>
                <div>
                    <label htmlFor="productName">Product Name</label>
                    <input 
                        className='input' 
                        id="productName"
                        type="text"
                        value={productToEdit.productName} 
                        {...register("productName")} 
                    />
                    { errors["productName"] && <p className='error--msg'>{errors["productName"]?.message}</p>}
                </div>
                <div>
                    <label htmlFor="description">Product Description</label>
                    <textarea     
                        className='input'            
                        id="description"
                        value={productToEdit.description} 
                        {...register("description")} 
                    >    
                    </textarea>
                    { errors["description"] && <p className='error--msg'>{errors["description"]?.message}</p>}
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input 
                        className='input' 
                        id="price"
                        type="text"
                        value={productToEdit.price}  
                        {...register("price")} 
                        />
                    { errors["price"] && <p className='error--msg'>{errors["price"]?.message}</p>}
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    { categories?.data && categories.data.length > 0 &&
                        <Autocomplete 
                        className="filter__products"
                        fullWidth
                        size="small"
                        // value={productToEdit.category.name} 
                        options={categories.data.map((category:Category) => category.name)}
                        renderInput={(params) => (
                            <TextField 
                            {...register("categoryName")} 
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                }}
                                />
                            )}
                        />
                    }  
                    { errors["categoryName"] && <p className='error--msg'>{errors["categoryName"]?.message}</p>}
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input 
                        className='input' 
                        id="quantity"
                        type="number" 
                        value={productToEdit.quantity}
                        {...register("quantity")} 
                        />
                    { errors["quantity"] && <p className='error--msg'>{errors["quantity"]?.message}</p>}
                </div>
                <div>
                    <label htmlFor="color">Color</label>
                    <input 
                        className='input' 
                        id="color"
                        type="text" 
                        value={productToEdit.colors.join(" ")} 
                        {...register("color")} 
                        />
                    { errors["color"] && <p className='error--msg'>{errors["color"]?.message}</p>}
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input 
                        className='input' 
                        id="image"
                        type="file" 
                        accept="image/*"
                        {...register("imageFile")} 
                        onChange={(e)=> handleImageChange(e.target.files)}
                        />
                    {imagePreview && <img src={imagePreview} width={40} height={30} />}
                    { errors["imageFile"] && <p className='error--msg'>{errors["imageFile"]?.message}</p>}
                </div>            
            </Stack>
        </>
    )
}

export default ProductFormEdit;