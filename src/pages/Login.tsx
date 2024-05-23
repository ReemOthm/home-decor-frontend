import Password from "@/components/ui/Password"
import { LoginFormData } from "@/data"
import { Button } from "@mui/material"

export const Login = ()=>{

        // -----------------------Renders-------------------
    const RegisterFormRender = LoginFormData.map(({type, placeholder, name,},index)=> 
        <div key={index}>
            {
                name == 'password' ? <Password />
                : 
                <input className="input" type={type} placeholder={placeholder} />
            }
        </div>
    )

    return (
        <>
            <div className="form--signup">
                <form>
                    {RegisterFormRender}
                    <Button variant="contained" fullWidth>Login</Button>
                </form>
            </div>
        </>
    )
}

