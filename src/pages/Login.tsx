import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";

import Password from "@/components/ui/Password"
import { LoginFormData } from "@/data"
import { LoginInput } from "@/types";
import { loginSchema } from "@/validation";
import LoadingBtn from "@/components/ui/LoadingBtn";

export const Login = ()=>{

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit:SubmitHandler<LoginInput> = (data) =>{
        console.log(data)
    }

    // -----------------------Renders-------------------
    const LoginFormRender = LoginFormData.map(({type, placeholder, name},index)=> 
        <div key={index}>
            {
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
                    {LoginFormRender}
                    <LoadingBtn title="Login" isLoding={false} />
                </Stack>
            </form>
        </>
    )
}

