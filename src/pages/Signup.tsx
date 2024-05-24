import { Stack, TextField} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { SignupFormData } from "@/data";
import Password from "@/components/ui/Password";
import { signupSchema } from "@/validation";
import { FormInput } from "@/types";
import LoadingBtn from "@/components/ui/LoadingBtn";
import api from "@/api";
import { AxiosError } from "axios";

export const Signup = ()=>{

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit:SubmitHandler<FormInput> = async (data) =>{
        const newUser = {...data, birthDate: new Date(data.birthDate)}

        setIsLoading(true);
        const id = toast.loading("Please wait...", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        
        try{
            const { status } = await api.post("/users/signup", newUser)

            if(status === 200){
                toast.update(id, {render: "Account Created Successfully!", type: "success", isLoading: false,autoClose: 5000},);
                navigate("/login")
            }
        }catch (error){
            const errorObject = error as AxiosError;
            toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 5000 });
        } finally{
            setIsLoading(false);
        }
    }
    
    // -----------------------Renders-------------------
    const SignupFormRender = SignupFormData.map(({type, placeholder, name},index)=> 
        <div key={index}>
            {
                type == 'date' ?                
                <TextField label={placeholder}  type={type} {...register(name)} fullWidth 
                error={!!errors[name]}
                helperText={errors[name]?.message}
                InputLabelProps={{shrink: true}}
                />
                :
                name == 'password' ? <Password register={register} errors={errors} name="password" />
                : 
                <TextField label={placeholder}  type={type} {...register(name)} fullWidth 
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                />
            }
        </div>
    )

    return (
        <>
            <form className="form--signup" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} width={400}>
                    {SignupFormRender}
                    <LoadingBtn title="Signup" isLoding={isLoading} />
                </Stack>
            </form>
        </>
    )
}