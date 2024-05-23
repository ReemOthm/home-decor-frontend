import { Button, Stack, TextField} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignupFormData } from "@/data";
import Password from "@/components/ui/Password";
import { signupSchema } from "@/validation";
import { FormInput } from "@/types";

export const Signup = ()=>{

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit:SubmitHandler<FormInput> = (data) =>{
        console.log(data)
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
                    <Button variant="contained" fullWidth type="submit">Signup</Button>
                </Stack>
            </form>
        </>
    )
}