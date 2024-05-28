import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from "axios";
import api from "@/api";

import Password from "@/components/ui/Password"
import { LoginFormData } from "@/data"
import { LoginInput } from "@/types";
import { loginSchema } from "@/validation";
import LoadingBtn from "@/components/ui/LoadingBtn";
import { Helmet } from "react-helmet";

export const Login = ()=>{

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit:SubmitHandler<LoginInput> = async(data) =>{

        setIsLoading(true);
        
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
            const response = await api.post("/login", data)
            const { token, refreshToken } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('isAdmin',  response.data.data.isAdmin);
            console.log(response)

            if(response.status === 200){
                toast.update(id, {render: "Login Successfully!", type: "success", isLoading: false,autoClose: 1000},);
                response.data.data.isAdmin ? navigate("/admin/dashboard") : navigate("/user/profile");
            }
        }catch (error){
            const errorObject = error as AxiosError;
            toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 2000 });
        } finally{
            setIsLoading(false);
        }
    }

    // -----------------------Renders-------------------
    const LoginFormRender = LoginFormData.map(({type, placeholder, name},index)=> 
        <div key={index}>
            {
                name == 'password' ? <Password register={register} errors={errors} name="password" />
                : 
                <TextField label={placeholder}  type={type} {...register(name)} fullWidth 
                    error={!!errors[name]}
                    size="small"
                    helperText={errors[name]?.message}
                />
            }
        </div>
    )

    return (
        <>
            <Helmet title="Login" />
            <form className="form--login" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" sx={{ mb : "10px"}}>Login</Typography>
                <Stack spacing={2} width={400}>
                    {LoginFormRender}
                    <LoadingBtn title="Login" isLoding={isLoading} />
                </Stack>
            </form>
        </>
    )
}

