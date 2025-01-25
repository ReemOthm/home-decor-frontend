import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/app/store";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";

import Password from "@/components/ui/Password"
import { LoginFormData } from "@/data"
import { LoginInput } from "@/types";
import { loginSchema } from "@/validation";
import LoadingBtn from "@/components/ui/LoadingBtn";
import { loginUser } from "@/app/features/userSlice";

export const Login = ()=>{

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit:SubmitHandler<LoginInput> = async(data) =>{
        const response = await dispatch(loginUser(data)).unwrap()
        response.data.isAdmin ? navigate("/admin/dashboard") : navigate("/user/profile");
    }

    // -----------------------Renders-------------------
    const LoginFormRender = LoginFormData.map(({type, placeholder, name},index)=> 
        <div key={index}>
            {
                name == 'password' ? <Password register={register} errors={errors} name="password" />
                : 
                <TextField label={placeholder}  type={type} {...register(name)} sx={{width: "100%", margin: "auto"}} 
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
            <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" sx={{ mb : "10px"}}>Login</Typography>
                <Stack spacing={2} width={350}>
                    {LoginFormRender}
                    <p className="sugnup__links"><Link to="/forget-password" className="basic--color">Forget Password?</Link></p>
                    <LoadingBtn title="Login" isLoding={false} />
                    <p className="signup__links">
                        Don&apos;t have an account?
                        <Link to="/signup" className="basic--color">Sign up</Link>
                    </p>
                </Stack>
            </form>
        </>
    )
}

