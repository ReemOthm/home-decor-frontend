import { Stack, TextField, Typography} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AxiosError } from "axios";

import { SignupFormData } from "@/data";
import Password from "@/components/ui/Password";
import { signupSchema } from "@/validation";
import { FormInput } from "@/types";
import LoadingBtn from "@/components/ui/LoadingBtn";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { registerUser } from "@/app/features/userSlice";

export const Signup = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit:SubmitHandler<FormInput> = async (data) =>{
        const newUser = {...data, birthDate: new Date(data.birthDate)}
        
        try{
            const status = await dispatch(registerUser(newUser)).unwrap()
            if(status == 200){
                navigate("/login")
            }
        }catch (error){
            const errorObject = error as AxiosError;
            return errorObject
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
                    <LoadingBtn title="Submit" isLoding={false} />
                    <p className="signup__links">
                        Already have an account?
                        <Link to="/login" className="basic--color">Login</Link>
                    </p>
                </Stack>
            </form>
        </>
    )
}