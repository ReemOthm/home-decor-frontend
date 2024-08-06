import { Stack, TextField, Typography} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { SignupFormData } from "@/data";
import Password from "@/components/ui/Password";
import { signupSchema } from "@/validation";
import { FormInput } from "@/types";
import LoadingBtn from "@/components/ui/LoadingBtn";
import api from "@/api";
import { AxiosError } from "axios";
import { Helmet } from "react-helmet";
import { Fullscreen } from "lucide-react";

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
            autoClose: 1000,
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
                toast.update(id, {render: "Account Created Successfully!", type: "success", isLoading: false,autoClose: 1000},);
                navigate("/login")
            }
        }catch (error){
            const errorObject = error as AxiosError;
            toast.update(id, {render: `${errorObject.message}`, type: "error", isLoading: false, autoClose: 2000 });
        } finally{
            setIsLoading(false);
        }
    }
    
    // -----------------------Renders-------------------
    const SignupFormRender = SignupFormData.map(({type, placeholder, name},index)=> 
        <div key={index}>
            {
                name == 'password' ? <Password register={register} errors={errors} name="password" />
                : 
                <TextField label={placeholder}  type={type} {...register(name)} sx={{width: "100%", margin: "auto"}}
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                    size="small"
                />
            }
        </div>
    )

    return (
        <>
            <Helmet title="Signup" />
            <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" sx={{ mb : "10px"}}>Signup</Typography>
                <Stack spacing={2} width="350px">
                    {SignupFormRender}
                    <LoadingBtn title="Submit" isLoding={isLoading} />
                    <p className="signup__links">
                        Already have an account?
                        <Link to="/login" className="basic--color">Login</Link>
                    </p>
                </Stack>
            </form>
        </>
    )
}