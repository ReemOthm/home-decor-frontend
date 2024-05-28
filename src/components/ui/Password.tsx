import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormInput, LoginInput, inputs } from "@/types";

interface PasswordProps{
    register: UseFormRegister<FormInput | LoginInput | any>,
    errors: FieldErrors<FormInput>,
    name: inputs
}

const Password = ({register, errors, name}:PasswordProps)=>{

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    {...register(name)}
                    error={!!errors[name]}
                    size="small"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                </InputAdornment>
                }
                label="Password"
                />
                {!!errors[name] && (
                    <FormHelperText error id="accountId-error">
                    {errors[name]?.message}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    )
}

export default Password;
