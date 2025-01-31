import { Autocomplete, Stack, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useSelector } from "react-redux";
import { ChangeEvent } from "react";

import { Category, Product } from "@/types";

interface IProductForm {
    handleChangeUpdate: (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void,
    register: UseFormRegister<Product>,
    errors: FieldErrors<Product>,
    imagePreview: string,
    setImagePreview: (file:string)=>void,
    setImageFile: (file:File|string)=>void
    productToEdit: Product
}

const ProductFormEdit = ({handleChangeUpdate,register, errors, imagePreview, setImagePreview, setImageFile, productToEdit}: IProductForm)=>{

    const categories = useSelector((state:any)=> state.categoryRoducer.categories)

    const handleImageChange = async(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            const file = e.target.files[0]
            if(!file) return
            setImagePreview(URL.createObjectURL(file))
            setImageFile(file)
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
                        onChange={handleChangeUpdate}
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
                        onChange={handleChangeUpdate}
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
                        onChange={handleChangeUpdate}
                    />
                    { errors["price"] && <p className='error--msg'>{errors["price"]?.message}</p>}
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    { categories && categories.length > 0 &&
                        <Autocomplete 
                            className="filter__products"
                            fullWidth
                            size="small"
                            value={productToEdit.category.name} 
                            options={categories.map((category:Category) => category.name)}
                            renderInput={(params) => (
                                <TextField 
                                {...register("categoryName")} 
                                onChange={handleChangeUpdate}
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
                        onChange={handleChangeUpdate}
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
                        onChange={handleChangeUpdate}
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
                        {...register("image")} 
                        onChange={handleImageChange}
                    />
                    {imagePreview && <img src={imagePreview} width={40} height={30} />}
                    { errors["image"] && <p className='error--msg'>{errors["image"]?.message}</p>}
                </div>            
            </Stack>
        </>
    )
}

export default ProductFormEdit;